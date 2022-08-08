function classify(cell_value) {

    let rawData = JSON.stringify({
        "outputIndicator": "",
        "taskDescription": "",
        "inputs": [
            cell_value
        ],
        "examples": [
            {
                "text": "The worst Wes Anderson movie ever ! It's undoubtedly a overstuffed showoff of his style and expertise. Not a die-hard Wes fan, but I adored Grand Budapest Hotel. However, this one is nowhere near as good as the Budapest. I didn't love it, wasn't quite an exciting nor an entertaining one for me, but I kinda enjoyed it to some extent",
                "label": "Negative"
            },
            {
                "text": "The French dispatch is not a film for everyone. It's not even a film for fans of Anderson. You think you love his works, his art? Think again",
                "label": "Negative"
            },
            {
                "text": "An impressive three part high-art romp that can, and does at times, morph into miniatures and cartoon illustration. ",
                "label": "Positive"
            },
            {
                "text": "Took my girlfriend and had an awesome time! She's not very familiar with Wes Anderson's work but I've shown her Grand Budapest and she really enjoyed that and this movie as well.",
                "label": "Positive"
            },
            {
                "text": "Loved it loved the style. I didn’t think I would love it. I didn’t love the trailer, but when I saw the whole movie, I was really impressed. I liked all the short stories, the mix of black and white, the humour, and comedy that was present in this movie.",
                "label": "Positive"
            },
            {
                "text": "I think the french dispatch is some of Wes Anderson's best work to date. I strongly believe it will stand the test if time and age extremely well just as his other work does. It is timeless while at the same time being very modern. ",
                "label": "Positive"
            },
            {
                "text": "I loved the obit and the first two stories but then the film sagged with the student portion. And after that, I only stuck it out till the end to watch the delightful visuals. Didn't like the rest of the stories, didn't like the rest of my movie apart from the picturesqueness.",
                "label": "Negative"
            },
            {
                "text": "This film has been called a sophisticated farce at a frenetic pace.  There's nothing sophisticated about it, it's incomprehensible psychobabble rubbish.  It is truly horrible and the fact that I was the only person in a giant cineplex theater shows you that other folks have figured it out too. ",
                "label": "Negative"
            },
            {
                "text": "A tour de force, with so many excellent 'bit parts'using big names and faces, it's a treat for the eyes and the soul! The storyline is unique and innovative,  with a different approach which is refreshing.  Bill Murray has always deadpannned like no other, love him dearly,  and Frances McDormand is a joy as ever.",
                "label": "Positive"
            },
            {
                "text": "The French Dispatch is different. The editor of the French Dispatch newsmagazine has died. They then produce a commemorative issue, including three of the more prominent pieces that were written for the magazine. The first one is very good. The second is where it fails. Wes Anderson gets too much into making it Wes Andersony and forgets the story. It is something about students protesting on a campus, but their reasoning either is never made clear or the story is not interesting enough for me to have caught it. The third story is pointless. ",
                "label": "Negative"
            },
            {
                "text": "A beautifully shot but incredibly disjointed movie, Anderson has really fumbled the ball here. ",
                "label": "Negative"
            },
            {
                "text": "I had high expectations of this movie, I’ve loved all of Wes’s previous work but this was overly complicated. I was taken in and absorbed by the beautiful and colourful symmetrical scenes but was overly confused by the storyline and narration. To say that I fell asleep twice on the first two attempts at watching the film may give a slight indication as to how good it is.",
                "label": "Negative"
            },
            {
                "text": "As a Wes Anderson enthusiast, this was a beautifully made film. the cinematography was spectacular and the stories shared were all wonderfully written and displayed. ",
                "label": "Positive"
            },
            {
                "text": "A beautiful collection of stories. The Cinematography is incredible.The music also gives a mood to each story. There is humour, warmth and nostalgia of places and times that don't exist anymore.",
                "label": "Positive"
            }]
    });

    let requestOptions = {
        'method': 'post',
        'contentType': 'application/json',
        'headers': {
            'Authorization': 'Bearer <your-token>'
        },
        'payload': rawData,
        redirect: 'follow'
    };

    let response = UrlFetchApp.fetch("https://api.cohere.ai/small/classify", requestOptions);
    let jsonObj = JSON.parse(response.getContentText());
    let classicationObj = jsonObj.classifications[0];
    let ourPrediction = classicationObj.prediction;
    let confidencesArr = classicationObj.confidences;
    let confidenceLvl;
    if (ourPrediction == "Positive") {
      //use the second confidence level
        confidenceLvl = (parseFloat(confidencesArr[1].confidence) * 100).toFixed(2) + "%";
    } else {
      //use the first confidence level
        confidenceLvl = (parseFloat(confidencesArr[0].confidence) * 100).toFixed(2) + "%";
    }

    let displayString = "PREDICTION: " + ourPrediction + " review\n" + "Confidence Level: " + confidenceLvl + "\n";
    return displayString;
}
function showSheetData() {
    let activeSheet = SpreadsheetApp.getActiveSheet();
    let cell_values = activeSheet.getDataRange().getValues();
    const reviews = [];
    for (let i = 1; i < data.length; i++) {
        reviews[i - 1] = '\n{\n"text" : "' + cell_values[i][0] + '"' + ',\n "label" : "' + cell_values[i][1] + '"\n}';
    }
    Logger.log(reviews);
}

function summarize(cell_value) {

    let raw = JSON.stringify({
        "prompt": "REVIEW: Loved it loved the style. I didn’t think I would love it. I didn’t love the trailer, but when I saw the whole movie, I was really impressed. I liked all the short stories, the mix of black and white, the humour, and comedy that was present in this movie. \n\nTLDR: I loved it, and I was impressed by the style in this movie. \n--\nREVIEW: I think the french dispatch is some of Wes Anderson's best work to date. I strongly believe it will stand the test if time and age extremely well just as his other work does. It is timeless while at the same time being very modern. \n\nTLDR: The movie is one of Wes Anderson's best work, and it is timeless.\n--\nREVIEW: I loved the obit and the first two stories but then the film sagged with the student portion. And after that, I only stuck it out till the end to watch the delightful visuals. Didn't like the rest of the stories, didn't like the rest of my movie apart from the picturesqueness.\n\nTLDR: I only loved the obit, the picturesqueness, and not the rest of the stories. \n--\nREVIEW: " + cell_value + "\n\nTLDR:",
        "max_tokens": 50,
        "temperature": 0.8,
        "k": 0,
        "p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "stop_sequences": [
            "--"
        ],
        "return_likelihoods": "NONE"
    });

    let requestOptions = {
        'method': 'post',
        'muteHttpExceptions': true,
        'contentType': 'application/json',
        'headers': {
            'Authorization': 'Bearer <your-token>'
        },
        'payload': raw,
        redirect: 'follow'
    };
    let response = UrlFetchApp.fetch("https://api.cohere.ai/small/generate", requestOptions)
    let jsonObj = JSON.parse(response.getContentText());
    let summarizedTxt = "REVIEW SUMMARY: " + jsonObj.text + "\n";
    return summarizedTxt;
}
function automate(sheetArg) {
    sheetArg = String(sheetArg);
    return classify(sheetArg) + "\n" + summarize(sheetArg);
}
