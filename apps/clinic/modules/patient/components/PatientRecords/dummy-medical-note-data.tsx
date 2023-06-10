// These are dummy content data, can remove them after integrated with BE to get actual data
import MedicalNoteImage1 from 'share-components/assets/patient/medical-record/image-1.png';
import MedicalNoteImage2 from 'share-components/assets/patient/medical-record/image-2.png';
import MedicalNoteImage3 from 'share-components/assets/patient/medical-record/image-3.png';

const DummyContent1 = `
  <table style="width: 50%; font-family: Inter,serif; font-weight: 400; line-height: 20px; color: #111827">
    <tr style="font-size: 12px;">
      <td>Weight</td>
      <td>Height</td>
      <td>BSA</td>
      <td>BMI</td>
    </tr>
    <tr>
      <td style="font-size: 14px;">55.00 kg</td>
      <td>160.00 cm</td>
      <td>1.56 m&sup2;</td>
      <td>21.48</td>
    </tr>
  </table>
`;

const DummyContent2 = `
  <span style="font-family: Inter,serif; font-size: 14px; line-height: 22px; letter-spacing: -0.018em; color: #111827">
    <p style="margin: 0">Dear Dr at Hospital KK,</p>
    <p style="margin: 0">I am referring to you a patient of mine, Mr Truman, 75 years old, for suspected heart disease.
    Mr Truman came to my surgery following a sudden unexpected syncope with no warning signs and no immediate sequellae.
    The episode only lasted for a few moments.</p>
    <br>
    <p style="margin: 0; font-weight: 700">Social history:</p>
    <p style="margin: 0">Retired bus driver Married, with 3 sons living locallyCurrent smoker</p>
    <br>
    <p style="margin: 0; font-weight: 700">Medical / surgical history:</p>
    <p style="margin: 0">C ABG five years ago</p>
    <br>
    <p style="margin: 0; font-weight: 700">Current treatment:</p>
    <p style="margin: 0">Aspirin, ACE inhibitors, beta-blockers for 5 years</p>
    <br>
    <p style="margin: 0; font-weight: 700">Family history:</p>
    <p style="margin: 0">Father died of MI at 60</p>
    <p style="margin: 0">Clinical examination: Normal</p>
    <br>
    <p style="margin: 0; font-weight: 700">complexion BP:</p>
    <p style="margin: 0">130/80; HR: 45bpmNo palpitations, no murmurPulmonary</p>
    <br>
    <p style="margin: 0; font-weight: 700">examination:</p>
    <p style="margin: 0">NADNeurological examination: Normal</p>
    <br>
    <p style="margin: 0">Thank you in advance for attending to my patient. I look forward to receiving your report.</p>
  </span>
`;

const DummyContent3 = `
  <img style="margin-left: 20px; border-radius: 12px" src=${MedicalNoteImage1.src}/>
  <img style="margin-left: 20px; border-radius: 12px" src=${MedicalNoteImage2.src}/>
  <img style="margin-left: 20px; border-radius: 12px" src=${MedicalNoteImage3.src}/>
`;

export { DummyContent1, DummyContent2, DummyContent3 };
