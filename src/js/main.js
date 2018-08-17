
import questions from './questions.json'

var page = questions.questions;

for(var i=0; i < page.length; i++){
	document.getElementById('question').innerHTML = page[1].text
}

console.log("Checked n verified");

// This section is added to avoid the hot module error and warning saying full reload is needed
if (module.hot) {
  module.hot.accept();
}