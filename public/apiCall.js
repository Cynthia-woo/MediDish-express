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
    const waveImg = document.getElementById('waveImage');
    const loadingImg = document.getElementById('loadingImage');
    const greetingDiv = document.getElementById('greeting');
    if (!inputText) return;// in case user don't submit anything
    waveImg.style.display = 'none';
    loadingImg.style.display = 'inline-block';
    greetingDiv.innerText = 'Hmmm...';
    document.getElementById('userInput').value = "";
    const topItemContainer = document.getElementById('item_container');
    const topItemName = document.getElementById('item_name');
    const topItemDes = document.getElementById('item_compositions');
    const topItemImg = document.getElementById('item_img');
    topItemContainer.style.display = 'none';

    const previousServerAnimated = document.querySelectorAll('.server_output');
    previousServerAnimated.forEach(element => {
        element.classList.remove('animated');
    });
    const previousUserAnimated = document.querySelectorAll('.user_input');
    previousUserAnimated.forEach(element => {
        element.classList.remove('animated1');
    });

    //put input information and respond information int the container
    responseDiv.innerHTML += `<div class='user_input animated1'><div class="user_input_content">${inputText}</div><div class="user_input_icon">
                        <img src="ui_img/Group%2023.png" alt="server_output_icon">
                    </div></div>`;

    // Scroll to the bottom
    const scrollingContainer1 = document.getElementById('response_content');
    const newMessage1 = scrollingContainer1.lastElementChild;
    newMessage1.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});


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
            console.log('callAPI data', data);
            // get information in JSON format
            const jsonLikeData = data.response.match(/{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/);

            // console.log('jsonlike data', jsonLikeData);
            const jsonData = jsonLikeData ? JSON.parse(jsonLikeData[0]) : data.response;
            console.log('json data', jsonData);

            var displayHTML = jsonData;

            if (jsonData !== data.response) {
                console.log(jsonData.recipes);
                // display HTML
                displayHTML = `
                <p>${jsonData?.comment}</p>
                <ul>${Object.values(jsonData?.recipes).map(recipe => `
                    <li>
            <strong>${recipe?.name}</strong>
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
            </ul>`;
            }
            console.log('responseDiv.innerHTML');

            const previousServerAnimated = document.querySelectorAll('.server_output');
            previousServerAnimated.forEach(element => {
                element.classList.remove('animated');
            });
            const previousUserAnimated = document.querySelectorAll('.user_input');
            previousUserAnimated.forEach(element => {
                element.classList.remove('animated1');
            });

            // responseDiv.innerHTML += `<div class='server_output'><div class="server_output_content">${data.response}</div></div>`;
            responseDiv.innerHTML += `<div class='server_output animated'><div class="server_output_content">${displayHTML}</div><div class="server_output_icon">
                        <img src="ui_img/Group%2023.png" alt="server_output_icon"></div></div>`;


            // Scroll to the bottom
            const scrollingContainer = document.getElementById('response_content');
            const newMessage = scrollingContainer.lastElementChild;
            newMessage.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});

            topItemContainer.style.display = 'flex';

            console.log('jsonData-name', jsonData.recipes[1]['name']);
            topItemName.innerText = `${jsonData?.recipes[1]['name']}`;

            if (topItemDes) {
                topItemDes.innerHTML = '';
                // Concatenate both li elements into a single string
                const compositionAndEfficacyHTML = `
        <li class="top_item_composition">${jsonData?.recipes[1]['composition']}</li>
        <li class="top_item_composition">${jsonData?.recipes[1]['efficacy']}</li>`;

                // Set innerHTML only once
                topItemDes.innerHTML = compositionAndEfficacyHTML;

                if (jsonData?.recipes[1]['image'] === 'N/A') {
                    fetch('./recipes.json')
                        .then(response => response.json())
                        .then(localData => {
                            topItemImg.src = localData.recipes[Math.floor(Math.random() * 40)]['newImg'];

                        })
                } else {
                    fetch('./recipes.json')
                        .then(response => response.json())
                        .then(localData => {
                            localData.recipes.forEach(recipe => {
                                if (jsonData?.recipes[1]['name'] === recipe['name']) {
                                    topItemImg.src = recipe['newImg'];
                                }
                            })
                        })
                }
            }




        } else {
            console.error('Error:', response.status);

        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        waveImg.style.display = 'inline-block';
        loadingImg.style.display = 'none';
        greetingDiv.innerText = 'Got it!';
    }
}
