import React from 'react';
import 'milligram';
import { useFetch } from 'react-async';

const urlSlackProfileView = 'https://wg2ljjg5da.execute-api.us-east-1.amazonaws.com/dev/profile/view';

function ProfileView(props) {
  const headers = { Accept: 'application/json' };
  const options = { method: 'GET', mode: 'cors' };
  const { data, error, isPending, run } = useFetch(`${urlSlackProfileView}/${props.idProfile}`, { headers }, options);
  
  if (data) {
    return (
      <div className="profile">
        <h2>{data.real_name}</h2>
        <img src={data.image_512} alt={`Profile picture for ${data.real_name}`}/>
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

// Stubbed out for now
function ProfileList(props) {
  return null;
}

// Presently justs lists yours truly
function App() {
  return (
    <div className="container">
      <h2>List of Profiles</h2>
      <ProfileView idProfile='UT1AQMNHK'/>
    </div>
  );
}
export default App;