// Animation For Search Input Placeholder
var a = 0
function typingAnimation(data,vn) {
    var text = data;
  
  var i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementsByClassName('result')[vn].innerHTML+= text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
  }

  typeWriter();
}
document.addEventListener("DOMContentLoaded", function() {
  var text = "Search Your Word Here...";
  
  var i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementById('search-input').placeholder+= text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
});




// Feteching Data From API
let img = document.getElementById('interface-img')
let searchInput = document.getElementById('search-input')
let searchBtn = document.getElementById('search-btn')
let content = document.getElementsByClassName('content-bar')[0]

function search(searchword){
  img.remove()
  content.innerHTML += `<b><p><li>Your Searching Word</li></p></b><h5>>>${searchword}</h5><b><p><li>Your Searching Result</li></p><b><h5 class="result">>></h5><hr>`

  
}

function scroll() {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth' 
  });
}

searchBtn.addEventListener('click',function () {
  const word = searchInput.value;
  
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(response => {
    if (!response.ok) {
      if(response.status == 404){
        if(word===""){
          alert("please Enter Something ")
        }
          
      else{
        search(word)
        //document.getElementsByClassName('result')[a].style.color = '#ff6969'
   typingAnimation('No Definition Found, Please Enter Valid word',a) 
    
    searchInput.value = ''
 
     a += 1
    scroll()
      }
        
      }
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
       search(word)
   typingAnimation(data[0].meanings[0].definitions[0].definition,a) 
    
    searchInput.value = ''
 
     a += 1
    
    
      scroll()

    
    
  })
  .catch(error => {
    
    console.log('h');
  })


  
})
 


  