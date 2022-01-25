/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey= '&appid=14c9585f4423c0a9d14e0e3de315e837'   //my apiKey 
// gets new date automatically using Javascript
function newDate() {
    const d = new Date();
    const newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
  
    return newDate;
  }
  
// similar to the source of code which is given in the course async
// by using click event adds click event to # generaate button
  document.getElementById('generate').addEventListener('click', performAction);
  
  function performAction(event){
      const zipCode =  document.getElementById('zip').value;
      const feelings =  document.getElementById('feelings').value;
      zipcode(baseURL, zipCode, apiKey) 
        .then(function(data){
            data.date = newDate();
            data.feelings = feelings;
            postData('/', data);
        })
        .then(updateUI);
  }
  
  const updateUI = async () => {
      const request = await fetch('/all');

      try{
        const projectData = await request.json();
        document.querySelector('#date').innerHTML = projectData.date;
        document.querySelector('#temp').innerHTML = projectData.temperature+"&deg"+"F";
        document.querySelector('#content').innerHTML = projectData.feelings;
    
      }catch(error){
        console.log("error occured", error);
      }
    }
  
  const zipcode = async (baseURL, zipCode, apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey+'&units=imperial')
  
    try {
      const data = await res.json();
  
      return data;
    }  catch(error) {
      console.log("error occured", error);
    }
  }
  
  
  const postData = async ( url = '', data = {})=>{
    try{
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),       
    });
  }catch(error){
    console.log("error occured", error);
  }
  
  }