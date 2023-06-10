import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { styled } from '@mui/material/styles';
import Box from '@mui/system/Box';
import { mergeRegister } from '@lexical/utils';
import { $getRoot, $insertNodes } from 'lexical';
import { $generateNodesFromDOM, $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import Theme from './themes/theme';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import AvixoHTMLEditorProps from './avixo-html-editor-types';

const EditorPlaceholder = styled(Box)(() => ({
  color: '#999',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '15px',
  left: '10px',
  fontSize: '15px',
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
}));

const Placeholder = () => <EditorPlaceholder>Write something</EditorPlaceholder>;

const editorConfig = {
  namespace: 'editor',
  // The editor theme
  theme: Theme,
  // Handling of errors during update
  onError(error: any) {
    // throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const Container = styled(Box)(() => ({
  borderRadius: '10px',
  color: '#000',
  position: 'relative',
  lineHeight: '20px',
  fontWeight: 400,
  textAlign: 'left',
  border: '1px solid #E6E8F0',
  overflow: 'hidden',
  height: '200px',
  '& .editor-text-bold': {
    fontWeight: 'bold',
  },
  '& .editor-text-italic': {
    fontStyle: 'italic',
  },
  '& .editor-text-underline': {
    fontDecoration: 'underline',
  },
  '& .editor-link': {
    color: 'rgb(33, 111, 219)',
    textDecoration: 'none',
  },
  '& .editor-paragraph': {
    margin: 0,
    marginBottom: '8px',
    position: 'relative',
    '& :last-child': {
      marginBottom: 0,
    },
  },
  '& .editor-list-ol': {
    padding: 0,
    margin: 0,
    marginLeft: '16px',
  },
  '& .editor-list-ul': {
    padding: 0,
    margin: 0,
    marginLeft: '16px',
  },
  '& .editor-listitem': {
    margin: '8px 32px 8px 32px',
  },
  '& .editor-nested-listitem': {
    listStyleType: 'none',
  },
}));

const EditorInner = styled(Box)(() => ({
  background: '#fff',
  position: 'relative',
  borderTop: '1px solid #E6E8F0',
}));

const EditorInput = styled(ContentEditable)(() => ({
  height: '150px',
  resize: 'none',
  fontSize: '14px',
  position: 'relative',
  tabSize: 1,
  outline: 0,
  padding: '15px 10px',
  caretColor: '#444',
  overflowY: 'scroll',
}));

// Ref: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
const HTML_TAG_REGEX = /(<([^>]+)>)/gi;

const removeTagFromHTMLString = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

function GetOnChangeHtmlValue({ onChange }: any) {
  const [editor] = useLexicalComposerContext();
  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(() => {
          editor.update(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            const root = $getRoot();
            const plainText = root.getTextContent().replaceAll(HTML_TAG_REGEX, '');
            if (onChange) {
              onChange(htmlString, plainText);
            }
          });
        }),
      ),
    [editor, onChange],
  );
  return null;
}

function SetInitialHtmlValue({ value }: any) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const onlyText = removeTagFromHTMLString($generateHtmlFromNodes(editor, null));
      if (value && !onlyText) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, 'text/html');

        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom);

        // Select the root
        $getRoot().select();

        // Insert them at a selection.
        $insertNodes(nodes);
      }
    });
  }, [editor, value]);

  return null;
}

export default function AvixoHTMLEditor(props: AvixoHTMLEditorProps) {
  const { initialValue, onChangeValue, ctnSxProps } = props;

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Container sx={{ ...ctnSxProps }}>
        <ToolbarPlugin />
        <EditorInner>
          <RichTextPlugin
            contentEditable={<EditorInput />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <SetInitialHtmlValue value={initialValue} />
          <GetOnChangeHtmlValue onChange={onChangeValue} />
          <ListPlugin />
          <LinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </EditorInner>
      </Container>
    </LexicalComposer>
  );
}
