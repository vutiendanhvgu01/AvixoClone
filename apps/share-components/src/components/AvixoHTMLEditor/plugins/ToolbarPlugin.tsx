/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-param-reassign */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isTextNode,
  $isRangeSelection,
  NodeSelection,
  GridSelection,
  RangeSelection,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isAtNodeEnd, $selectAll } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import { createPortal } from 'react-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BoldIcon from '../../AvixoIcons/editor-bold';
import ItalicIcon from '../../AvixoIcons/editor-italic';
import UnderlineIcon from '../../AvixoIcons/editor-underline';
import LinkIcon from '../../AvixoIcons/editor-link';
import ListNumIcon from '../../AvixoIcons/editor-list-num';
import ListOlIcon from '../../AvixoIcons/editor-list-ol';
import ClearIcon from '../../AvixoIcons/editor-clear';
import PencilFillIcon from '../../AvixoIcons/pencil-fill-icon';

const LowPriority = 1;

const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  number: 'Numbered List',
  paragraph: 'Normal',
};

const positionEditorElement = (editor: any, rect: { top: any; height: any; left: number; width: number } | null) => {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.scrollY + 10}px`;
    editor.style.left = `${rect.left + window.scrollX - editor.offsetWidth / 2 + rect.width / 2}px`;
  }
};

const getSelectedNode = (selection: any) => {
  const { anchor } = selection;
  const { focus } = selection;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  }
  return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
};

const LinkEditor = styled(Box)(() => ({
  position: 'absolute',
  zIndex: '100',
  top: '-10000px',
  left: '-10000px',
  marginTop: '-6px',
  maxWidth: '300px',
  width: '100%',
  opacity: 0,
  backgroundColor: '#fff',
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
  borderRadius: '8px',
  transition: 'opacity 0.5s',
}));

const LinkInput = styled('input')(() => ({
  display: 'block',
  width: 'calc(100% - 24px)',
  boxSizing: 'border-box',
  margin: '8px 12px',
  padding: '8px 12px',
  borderRadius: '15px',
  backgroundColor: '#eee',
  fontSize: '15px',
  color: 'rgb(5, 5, 5)',
  border: 0,
  outline: 0,
  position: 'relative',
  fontFamily: 'inherit',
}));

const LinkDiv = styled('div')(() => ({
  display: 'block',
  width: 'calc(100% - 24px)',
  boxSizing: 'border-box',
  margin: '8px 12px',
  padding: '8px 12px',
  borderRadius: '15px',
  backgroundColor: '#eee',
  fontSize: '15px',
  color: 'rgb(5, 5, 5)',
  border: 0,
  outline: 0,
  position: 'relative',
  fontFamily: 'inherit',
}));

const LinkEdit = styled('div')(() => ({
  backgroundSize: '16px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '35px',
  verticalAlign: '-0.25em',
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  cursor: 'pointer',
  padding: '10px',
}));

const LinkEditLabel = styled('a')(() => ({
  color: 'rgb(33, 111, 219)',
  textDecoration: 'none',
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginRight: '30px',
  textOverflow: 'ellipsis',
}));

const updateLinkUrl = (selection: any, setLinkUrl: (url: string) => void) => {
  const node = getSelectedNode(selection);
  const parent = node.getParent();
  if ($isLinkNode(parent)) {
    setLinkUrl(parent.getURL());
  } else if ($isLinkNode(node)) {
    setLinkUrl(node.getURL());
  } else {
    setLinkUrl('');
  }
};

const FloatingLinkEditor = ({ editor }: any) => {
  const editorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      updateLinkUrl(selection, setLinkUrl);
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const { activeElement } = document;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }
  }, [editor]);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }: any) => {
          editorState.read(() => {
            updateLinkEditor();
          });
        }),

        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateLinkEditor();
            return true;
          },
          LowPriority,
        ),
      ),
    [editor, updateLinkEditor],
  );

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleChange = useCallback((event: any) => {
    setLinkUrl(event.target.value);
  }, []);

  const handleKeydown = useCallback(
    (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (lastSelection !== null) {
          if (linkUrl !== '') {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
          }
          setEditMode(false);
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setEditMode(false);
      }
    },
    [editor, lastSelection, linkUrl],
  );

  const handleClick = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleMouseDown = useCallback((event: any) => event.preventDefault(), []);

  return (
    <LinkEditor ref={editorRef}>
      {isEditMode ? (
        <LinkInput ref={inputRef} value={linkUrl} onChange={handleChange} onKeyDown={handleKeydown} />
      ) : (
        <LinkDiv>
          <LinkEditLabel href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkUrl}
          </LinkEditLabel>
          <LinkEdit role="button" tabIndex={0} onMouseDown={handleMouseDown} onClick={handleClick}>
            <PencilFillIcon />
          </LinkEdit>
        </LinkDiv>
      )}
    </LinkEditor>
  );
};

const ToolBar = styled('div')(() => ({
  display: 'flex',
  background: '#fff',
  padding: '4px',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  verticalAlign: 'middle',
}));

const ToolBarBtn = styled('button')(() => ({
  border: '0',
  display: 'flex',
  background: 'none',
  borderRadius: '10px',
  padding: '8px',
  cursor: 'pointer',
  verticalAlign: 'middle',
  marginRight: '2px',
  '&:hover': {
    backgroundColor: '#eee',
  },
  '&.active': {
    backgroundColor: 'rgba(223, 232, 250, 0.3)',
  },
}));

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');

  const formatList = useCallback(
    (listType: any) => {
      if (listType === 'number' && blockType !== 'number') {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        setBlockType('number');
      } else if (listType === 'bullet' && blockType !== 'bullet') {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        setBlockType('bullet');
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        setBlockType('paragraph');
      }
    },
    [blockType, editor],
  );

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, []);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar();
          });
        }),
      ),
    [editor, updateToolbar],
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const clearFormatting = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $selectAll(selection);
        selection.getNodes().forEach((node: any) => {
          if ($isTextNode(node)) {
            node.setFormat(0);
            node.setStyle('');
          }
        });
      }
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
    });
  }, [editor]);

  return (
    <ToolBar ref={toolbarRef}>
      <ToolBarBtn
        type="button"
        onClick={useCallback(() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }, [editor])}
        className={`${isBold ? 'active' : ''}`}
        aria-label="Format Bold"
      >
        <BoldIcon />
      </ToolBarBtn>
      <ToolBarBtn
        type="button"
        onClick={useCallback(() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }, [editor])}
        className={`${isItalic ? 'active' : ''}`}
        aria-label="Format Italics"
      >
        <ItalicIcon />
      </ToolBarBtn>
      <ToolBarBtn
        type="button"
        onClick={useCallback(() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }, [editor])}
        className={`${isUnderline ? 'active' : ''}`}
        aria-label="Format Underline"
      >
        <UnderlineIcon />
      </ToolBarBtn>
      <ToolBarBtn type="button" onClick={insertLink} className={`${isLink ? 'active' : ''}`} aria-label="Insert Link">
        <LinkIcon />
      </ToolBarBtn>
      {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
      <ToolBarBtn
        type="button"
        onClick={useCallback(() => formatList('number'), [formatList])}
        aria-label="Format List Number"
      >
        <ListNumIcon />
      </ToolBarBtn>
      <ToolBarBtn
        type="button"
        onClick={useCallback(() => formatList('bullet'), [formatList])}
        aria-label="Format List Number"
      >
        <ListOlIcon />
      </ToolBarBtn>
      <ToolBarBtn type="button" onClick={clearFormatting} aria-label="Format List Number">
        <ClearIcon />
      </ToolBarBtn>
    </ToolBar>
  );
}
