//use keyboard to submit request
const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        console.log("Keyboard submit");
        callAPI();
    }
}

//call api from frontend
async function callAPI() {
    const inputText = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response_content');
    if (!inputText) return;// in case user don't submit anything


    try {
        //json format
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({inputText}),
        });

        // console.log(response);
        // test whether post is correct
        if (response.ok) {
            const data = await response.json();
            // console.log('callAPI data', data);
            // get information in JSON format
            const jsonLikeData = data.response.match(/{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/);

            // console.log('jsonlike data', jsonLikeData);
            const jsonData = jsonLikeData ? JSON.parse(jsonLikeData[0]) : data.response;

            var displayHTML = jsonData;

            if (jsonData !== data.response) {
                // display HTML
                displayHTML = `
                <p>${jsonData?.comment}</p>
                <ul>${Object.values(jsonData?.recipes).map(recipe => `
                    <li>
            <strong>${recipe?.name?.slice(2, -2)}</strong>
            <ul>
              <li>Main Medicine: ${recipe['main medicine']}</li>
              <li>Composition: ${recipe?.composition}</li>
              <li>Preparation Method: ${recipe?.preparation_method}</li>
<!--              <li>Efficacy: ${recipe?.efficacy}</li>-->
<!--               <li>Health Care Application: ${recipe.health_care_application}</li>-->
<!--               <li><img src="${recipe.image}" alt="${recipe.name}" width="200"></li>-->
            </ul>
          </li>
        `).join('')}
      </ul>
    `;
            }

            //put input information and respond information int the container
            responseDiv.innerHTML += `<div class='user_input'><div class="user_input_content">${inputText}</div></div>`;
            // responseDiv.innerHTML += `<div class='server_output'><div class="server_output_content">${data.response}</div></div>`;
            responseDiv.innerHTML += `<div class='server_output'><div class="server_output_content">${displayHTML}</div></div>`;
            document.getElementById('userInput').value = "";

            // Scroll to the bottom
            const scrollingContainer = document.getElementById('response_content');
            const newMessage = scrollingContainer.lastElementChild;
            newMessage.scrollIntoView({behavior: 'smooth'});
        } else {
            console.error('Error:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // loadingLabel.style.display = 'none';
    }
}
