import { Box, InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AvatarFill } from 'share-components';
import { Organisation } from 'modules/organisation/components/organisation-types';
import { FORM, MODE, OPERATIONALSTATUS, STATUS } from '../constants';
import PremiseFormAction from './premise-form-action';
import { FlexBox, FormControlComponent, FormFieldsContainer, StackTitle } from './premise-form-common-component';
import { PremiseFormDetailProps } from './premise-form-component-types';
import OrganisationProxyService from '../../organisation/services/proxy';

const PremiseFormDetail: React.FC<PremiseFormDetailProps> = props => {
  const { header, handleChange, handleBlur, touched, errors, values } = props;
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [parentOrganisations, setParentOrganisations] = React.useState<Partial<Organisation>[]>([]);

  useEffect(() => {
    OrganisationProxyService.getParentOrganisation()
      .then(({ data }) => {
        setParentOrganisations(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Box>
      <FormFieldsContainer>
        <Stack>
          <StackTitle variant="h6">{header}</StackTitle>
          <FlexBox
            sx={{
              marginBottom: '10px',
              justifyContent: 'space-between',
            }}
          >
            <AvatarFill
              handleChange={(img: string) => setSelectedAvatar(img)}
              avatarUrl={selectedAvatar}
              onRemove={() => setSelectedAvatar(null)}
            />
          </FlexBox>
          <FormControlComponent fullWidth>
            <InputLabel id="premise-name" required>
              Name
            </InputLabel>
            <OutlinedInput
              required
              label="Name"
              name="name"
              inputProps={{
                'data-cy': 'name',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.name && errors.name)}
              value={values.name}
            />
          </FormControlComponent>
          <FormControlComponent fullWidth>
            <InputLabel id="premise-alias" required>
              Alias
            </InputLabel>
            <OutlinedInput
              required
              label="Alias"
              name="alias"
              inputProps={{
                'data-cy': 'alias',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.alias && errors.alias)}
              value={values.alias}
            />
          </FormControlComponent>
          <FormControlComponent fullWidth error={!!(touched.parentOrganization && errors.parentOrganization)}>
            <InputLabel id="type-options" required>
              Parent Organisation
            </InputLabel>
            <Select
              labelId="parentOrganisation-options"
              id="parentOrganisation-options-select"
              name="parentOrganizationy"
              label="Parent Organisation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.parentOrganization}
            >
              {parentOrganisations?.map((parentOrganisation: Partial<Organisation>) => (
                <MenuItem key={`parentOrganisation-option-item-${parentOrganisation.id}`} value={parentOrganisation.id}>
                  {parentOrganisation.name}
                </MenuItem>
              ))}
            </Select>
          </FormControlComponent>
          <FormControlComponent fullWidth>
            <InputLabel id="premise-company-name">Company Name</InputLabel>
            <OutlinedInput
              label="Company Name"
              name="companyName"
              inputProps={{
                'data-cy': 'company-name',
              }}
              required
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.companyName && errors.companyName)}
              value={values.companyName}
            />
          </FormControlComponent>
          <FormControlComponent fullWidth>
            <InputLabel id="premise-company-name">Company Registration No.</InputLabel>
            <OutlinedInput
              label="Company Registration No."
              name="companyRegNo"
              inputProps={{
                'data-cy': 'company-registration-no',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!(touched.companyRegNo && errors.companyRegNo)}
              value={values.companyRegNo}
            />
          </FormControlComponent>
          <FormControlComponent fullWidth>
            <InputLabel id="type-options" required>
              Mode
            </InputLabel>
            <Select
              labelId="mode-options"
              id="mode-options-select"
              name="mode"
              label="Mode"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mode}
            >
              {Object.values(MODE).map(mode => (
                <MenuItem key={`type-item-${mode}`} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </Select>
          </FormControlComponent>
          <FlexBox sx={{ justifyContent: 'space-between' }}>
            <FormControlComponent fullWidth sx={{ marginRight: '20px' }}>
              <InputLabel id="premise-hci-code" required>
                HCI Code
              </InputLabel>
              <OutlinedInput
                label="HCI Code"
                name="hciCode"
                inputProps={{
                  'data-cy': 'hci-code',
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.hciCode && errors.hciCode)}
                value={values.hciCode}
              />
            </FormControlComponent>
            <FormControlComponent fullWidth>
              <InputLabel id="premise-hospital-code" required>
                Hospital Code
              </InputLabel>
              <OutlinedInput
                label="Hospital Code"
                name="hospitalCode"
                inputProps={{
                  'data-cy': 'hospital-code',
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.hospitalCode && errors.hospitalCode)}
                value={values.hospitalCode}
              />
            </FormControlComponent>
          </FlexBox>
          <FlexBox sx={{ justifyContent: 'space-between' }}>
            <FormControlComponent fullWidth sx={{ marginRight: '20px' }}>
              <InputLabel id="premise-type-code">Type Code</InputLabel>
              <OutlinedInput
                label="Type Code"
                name="typeCode"
                inputProps={{
                  'data-cy': 'type-code',
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.typeCode && errors.typeCode)}
                value={values.typeCode}
              />
            </FormControlComponent>

            <FormControlComponent fullWidth>
              <InputLabel id="premise-type-name">Type Name</InputLabel>
              <OutlinedInput
                label="Type Name"
                name="typeName"
                inputProps={{
                  'data-cy': 'type-name',
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.typeName && errors.typeName)}
                value={values.typeName}
              />
            </FormControlComponent>
          </FlexBox>
          <FormControlComponent fullWidth>
            <InputLabel id="type-options" required>
              Form
            </InputLabel>
            <Select
              labelId="form-options"
              id="form-options-select"
              name="form"
              label="Form"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.form}
            >
              {Object.values(FORM).map(form => (
                <MenuItem key={`type-item-${form}`} value={form}>
                  {form}
                </MenuItem>
              ))}
            </Select>
          </FormControlComponent>
          <FormControlComponent fullWidth>
            <InputLabel id="type-options">Operational Status</InputLabel>
            <Select
              labelId="operationalStatus-options"
              id="operationalStatus-options-select"
              name="operationalStatus"
              label="Operational Status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.operationalStatus}
            >
              {Object.values(OPERATIONALSTATUS).map(operationalStatus => (
                <MenuItem key={`type-item-${operationalStatus}`} value={operationalStatus}>
                  {operationalStatus}
                </MenuItem>
              ))}
            </Select>
          </FormControlComponent>
          <FormControlComponent fullWidth>
            <InputLabel id="type-options" required>
              Status
            </InputLabel>
            <Select
              labelId="status-options"
              id="status-options-select"
              name="status"
              label="Status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
              defaultValue={STATUS.active}
            >
              {Object.values(STATUS).map(status => (
                <MenuItem key={`type-item-${status}`} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControlComponent>
          <FormControlComponent fullWidth>
            <InputLabel id="premise-description" required>
              Description
            </InputLabel>
            <OutlinedInput
              label="Description"
              name="description"
              inputProps={{
                'data-cy': 'description',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
          </FormControlComponent>
          <PremiseFormAction {...props} title="2. Contact Information" />
        </Stack>
      </FormFieldsContainer>
    </Box>
  );
};

export default PremiseFormDetail;
