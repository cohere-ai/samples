//Do not share this token
//TODO input your own API token
const TOKEN = ''

// this is where we call the API to classify our unlabeled text based on the training data we pass in as a prompt
function classify(s_args, s_input) {

  // we start by extracting the training data from the specified range in s_args and packaging it into a prompt
  let inputs = [s_input];
  let examples = [];
  for (let i = 0; i< s_args.length; i++) {
    //this is assuming label is always the 2nd parameter
    examples.push({"text" : s_args[i][0] , "label" : s_args[i][1]})
  }

  const training_and_test_data = {
    examples,
    inputs
  };

  const options = {
    'headers' : { 'Authorization' : 'Bearer ' + TOKEN },
    'method' : 'post',
    'model' : 'medium',
    'contentType': 'application/json',
    'payload' : JSON.stringify(training_and_test_data)
  };
  const response = UrlFetchApp.fetch('https://api.cohere.ai/classify', options);
  const responseContentText = JSON.parse(response.getContentText());
  const classificationContent = responseContentText.classifications[0];
  const ourPrediction = classificationContent.prediction;
  const confidencesArr = classificationContent.confidences;
  const confidenceIndex = ourPrediction === "Positive" ? 1 : 0;
  const confidenceLvl = (confidencesArr[confidenceIndex].confidence * 100).toFixed(2) + "%";

  let displayString = "PREDICTION: " + ourPrediction + " review\n" + "Confidence Level: " + confidenceLvl + "\n";
  return displayString;

}

// this is where we call the API to summarize the review
function summarize(cell_value) {

// we've hard-coded some examples to train the AI to summarize a Review
   let raw = JSON.stringify({
       "prompt": "TEXT: Loved it loved the style. I didn’t think I would love it. I didn’t love the trailer, but when I saw the whole movie, I was really impressed. I liked all the short stories, the mix of black and white, the humour, and comedy that was present in this movie.\n\nTLDR: I loved it, and I like all the stories in this movie.\n--\nTEXT: I read on the news that interest rates are going up. Does this impact the interest rate in my savings account?\n\nTLDR: Will rising interest rates impact my savings account?\n--\nTEXT: I went online for information about Dockers Khaki pants. The size my husband wears are very hard to find in stores. I was very impressed with the selection I had and he was thrilled to have all these pants without having them taken up in the length. The delivery was quick (especially during Christmas) and I really appreciate all the effort made to send us the selections we chose.\n\nTLDR: I was impressed by their selection and quick delivery. My husband was thrilled to have pants in his size.\n--\nTEXT: My family situation is changing and I need to update my risk profile for my equity investments.\n\nTLDR: I need to update my investment risk profile\n--\nTEXT: " + cell_value + "\n\nTLDR:",
       "max_tokens": 50,
       "temperature": 0.7,
       "k": 0,
       "p": 1,
       "frequency_penalty": 0,
       "presence_penalty": 0,
       "stop_sequences": [
           "--"
       ],
       "model": "xlarge",
       "return_likelihoods": "NONE"
   });
   let requestOptions = {
       'method': 'post',
       'muteHttpExceptions': true,
       'contentType': 'application/json',
       'headers': {
           'Authorization': 'Bearer ' + TOKEN
       },
       'payload': raw,
       redirect: 'follow'
   };
   let response = UrlFetchApp.fetch("https://api.cohere.ai/generate", requestOptions)
   let responseContentTxt = JSON.parse(response.getContentText());
   let summarizedTxt = "SUMMARY: " + responseContentTxt.text + "\n";
   return summarizedTxt;

}
