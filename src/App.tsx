import { useEffect } from 'react';
import CCalendar from './components/CCalendar';
import data from './data.json';
import FormTask from './components/FormTask';
import './App.css';
// import { GoogleSheetsTable } from "google-sheets-table";


const events: any = data.map(({ start, end, ...rest }) => ({
  start: new Date(Date.parse(start)),
  end: new Date(Date.parse(end)),
  ...rest,
}));

const {
  GOOGLE_AUTH_CLIENT_EMAIL: client_email,
  GOOGLE_AUTH_PRIVATE_KEY: private_key,
  GOOGLE_SPREADSHEET_ID: spreadsheetId,
} = import.meta.env;

// const table = new GoogleSheetsTable({
//   // using a Google service account
//   credentials: {
//     client_email,
//     private_key,
//   },
//   spreadsheetId,
//   sheetName: "Sheet1",
//   // enforce that 'id' and 'sku' columns are unique
//   columnConstraints: { uniques: ["id"] },
// });

// const serviceAccountAuth = new JWT({
//   email: creds.client_email,
//   key: creds.private_key,
//   scopes: SCOPES
// });

// const doc = new GoogleSpreadsheet('1Gg6bNTolmnior5yOiPc5ePgHvzm2Ain5vDPYQCEZ9lQ', serviceAccountAuth);


function App() {

  const getAPI = async () => {
    // const { row } = await table.findRow((r) => r.id === 1001);
    console.log(client_email);
    // await doc.loadInfo(); // loads document properties and worksheets
    // console.log(doc.title);
  }

  useEffect(() => {
    getAPI();
  }, [])

  return (
    <>
      <div style={{ height: '90vh' }}>
        <CCalendar events={events} />
      </div>
      <FormTask />
    </>
  );
}

export default App;
