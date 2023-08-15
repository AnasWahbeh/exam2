document.addEventListener('DOMContentLoaded', function () {
  const itemElements = document.querySelectorAll('.item');

  itemElements.forEach(item => {
    item.addEventListener('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });

    item.addEventListener('mouseout', () => {
      document.body.style.cursor = 'default';
    });

    item.addEventListener('click', loadItem);
  });

  const backButton = document.createElement('button'); 
  backButton.textContent = 'Back'; 
  backButton.style.position = 'fixed';
  backButton.style.top = '120px';
  backButton.style.left = '10px';
  backButton.style.zIndex = '1000';
  backButton.style.fontSize ="large";
  document.body.appendChild(backButton); 
  backButton.addEventListener('click', () => {
    resetSections(); 
  });
});

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector(".section").addEventListener("click", function () {
    var item = null;
    var xttp = new XMLHttpRequest();
    xttp.onreadystatechange = function () {
      if ((this.readyState == 4) && (this.status == 200)) {
        item = this.responseText;
        var xttp = new XMLHttpRequest();
        xttp.onreadystatechange = function () {
          if ((this.readyState == 4) && (this.status == 200)) {
            var entry = JSON.parse(this.responseText);

            item = item.replace(new RegExp("{{name}}", "g"), entry.name);
            item = item.replace(new RegExp("{{description}}", "g"), entry.description);

            document.querySelector("#details").innerHTML = document.querySelector("#details").innerHTML + item;
          }
        };
        xttp.open("GET", "chicken.json", true);
        xttp.send(null);//for POST only
      }
    };
    xttp.open("GET", "item.html", true);
    xttp.send(null);//for POST only
  });

});

function loadItem() {
  
  var xttp = new XMLHttpRequest();
  xttp.onreadystatechange = function () {
    if ((this.readyState == 4) && (this.status == 200)) {
      var entry = JSON.parse(this.responseText);
      var menuHTML = '<div class="divcon"><div class="row">';
      
      for (let i = 0; i < entry.length; i++) {
        menuHTML += `
      
        <section  class="diva col-lg-4 col-md-5 col-s-12">
          <div class="title1"> ${entry[i].name}</div>
          <p class="pTitle">${entry[i].description}</p>
        </section>`
        
        ;

      }

      menuHTML += '</div></div>';
      document.querySelector("#details").innerHTML = menuHTML;

      // Add event listeners to show the next section when clicking
      var currentSectionIndex = 0;
      document.addEventListener("click", function () {
        // Show the next section
        currentSectionIndex++;
        var nextSection = document.querySelector(`#section_${currentSectionIndex}`);
        if (nextSection) {
          nextSection.style.display = "block";
        }
      });
    }
  };

  xttp.open("GET", "/chicken.json", true);
  xttp.send();
}

// Function to reset the sections to initial state
function resetSections() {
  var sections = document.querySelectorAll(".diva");
  sections.forEach(function (section, index) {
    section.style.display = index === 0 ? "block" : "none";
  });
}
