
import questions from './questions.json';

var i= 0;
var score = 0;
var page = questions.questions;
var timeClicked = 0;



generateQuestion(0);
//console.log(page.length);

function _(id){
 return document.getElementById(id);
}



function generateQuestion(i){
	_('right-answer').innerHTML = ""
	_("opt1").checked = false;
	_("opt2").checked = false;
	_("opt3").checked = false;
	_('question').innerHTML = page[i].heading;
	_('question-desc').innerHTML = page[i].text_description;
	_('optt1').innerHTML = page[i].choices[0]
	_('optt2').innerHTML = page[i].choices[1]
	_('optt3').innerHTML = page[i].choices[2]
	_('optt1').value = page[i].choices[0]
	_('optt2').value = page[i].choices[1]
	_('optt3').value = page[i].choices[2]

}
function nextQuestion(i){
	_("btn-cont").addEventListener('click',function(e){

		if(page.length > i){
			generateQuestion(i);
		} else{
			_('block-quiz').innerHTML = "Your score is "+ score;
		}
	});



}	
	

function checkAnswer(){
	//e.preventDefault();
	
	if(_("opt1").checked && (_('optt1').value === page[i].answer)){
		//_("opt1").value  = page[i].choices[0];
		score++;

	} else{
		_('right-answer').innerHTML = page[i].answer;
	}
	if(_("opt2").checked &&(_('optt2').value === page[i].answer )){
		//_("opt2").value  = page[i].choices[1];
		score++;
		
	} else{
		_('right-answer').innerHTML = page[i].answer;
	}
	
	if(_("opt3").checked &&  _('optt3').value === page[i].answer){
		//_("opt3").value  = page[i].choices[2];
		score++;
		
	} else{
		_('right-answer').innerHTML = page[i].answer;
	}
	i++;
	_('btn-cont').innerHTML  = "Continue";

	nextQuestion(i);
	
}

_("btn-cont").addEventListener('click',function(e){
	var timesClicked =1;

	e.preventDefault();
	if( timesClicked % 2 != 0){
		timesClicked++;
		_('btn-cont').innerHTML  = "Submit Answer";
		checkAnswer();
	}
	
	
	
})

// This section is added to avoid the hot module error and warning saying full reload is needed
if (module.hot) {
  module.hot.accept();
}