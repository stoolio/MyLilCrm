let handle = (err) => {
  console.log('--Error--');
  if(err.status) {
    console.log('Status: ', err.status);
    console.log(err.response);
  } else {
    console.log(err);
  }
  console.log('---------');
};

export default handle;
