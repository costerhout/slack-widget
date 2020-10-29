import React from 'react';
import DataTable from 'react-data-table-component';
import 'milligram';
import { useFetch } from 'react-async';

const urlSlackProfileView = 'https://wg2ljjg5da.execute-api.us-east-1.amazonaws.com/dev/profile/view';
const urlSlackProfileList = 'https://wg2ljjg5da.execute-api.us-east-1.amazonaws.com/dev/profile/list';

function ProfileView(props) {
  const headers = { Accept: 'application/json' };
  const options = { method: 'GET', mode: 'cors' };
  const { data, error } = useFetch(`${urlSlackProfileView}/${props.idProfile}`, { headers }, options);
  
  if (data) {
    return (
      <div className="profile">
        <h3>{data.real_name}</h3>
        <img src={data.image_512} alt={`${data.real_name}`}/>
      </div>
    );
  }
  
  if (error) {
    return (
      <pre>{JSON.stringify(error, null, 2)}</pre>
    );
  }
  
  return null;
}

function ProfileList() {
  const headers = { Accept: 'application/json' };
  const options = { method: 'GET', mode: 'cors' };
  const columns = [
    {
      name: 'Name',
      selector: 'real_name',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status_text',
      sortable: false,
      right: true,
    },
  ];
  const { data, error } = useFetch(`${urlSlackProfileList}`, { headers }, options);
  
  if (data) {
    // The data is a collection of objects. Each user object has a profile object, and that's what we're building off of.
    const profiles = data.map((user) => user.profile);
    
    return (
      <div className="profileList">
        <DataTable
          title="Slack Channel Members"
          pagination={true}
          paginationServer={false}
          paginationRowsPerPage={20}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          fixedHeader={true}
          columns={columns}
          data={profiles}
          />
      </div>
    );
  }
  
  if (error) {
    return (
      <pre>{JSON.stringify(error, null, 2)}</pre>
    );
  }
  
  return null;
}

// Presently justs lists a few hardcoded IDs
function App() {
  return (
    <div className="container">
      <h2>Single Profiles</h2>
      <div className="row">
        <div className="col">
          <ProfileView idProfile='UT1AQMNHK'/>
        </div>
        <div className="col">
          <ProfileView idProfile='U8FPH8QAC'/>
        </div>
        <div className="col">
          <ProfileView idProfile='UNG3GTJCQ'/>
        </div>
      </div>
      
      <h2>List of Profiles</h2>
      <ProfileList />
    </div>
  );
}
export default App;