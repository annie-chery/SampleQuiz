
import questions from './questions.json';

var i= 0;
var score = 0;
var page = questions.questions;
var flag = true;
var lbls = document.querySelectorAll('.choice-lbl')


 
generateQuestion(0);

function _(id){
 return document.getElementById(id);
}



function generateQuestion(i){
	_('right-answer').style.display = "none";
	_("opt1").checked = false;
	_("opt2").checked = false;
	_("opt3").checked = false;
	_('question').innerHTML = page[i].heading;
	_('question-desc').innerHTML = page[i].text_description;
	_('optt1').innerHTML = `<span></span>`+page[i].choices[0]
	_('optt2').innerHTML = `<span></span>`+page[i].choices[1]
	_('optt3').innerHTML = `<span></span>`+page[i].choices[2]
	_('opt1').value = page[i].choices[0]
	_('opt2').value = page[i].choices[1]
	_('opt3').value = page[i].choices[2]

}

/*
* Following function is to call the generate function for the next question
*
*/
function nextQuestion(){
	
	if(page.length > i){
		lbls.forEach(function(lbl){
			if(lbl.classList.contains('grayd')){
				lbl.classList.remove('grayd');
			}
			if(lbl.classList.contains('style-label')){

				lbl.classList.remove('style-label')
			}
			if(lbl.classList.contains('wrong-label')){

				lbl.classList.remove('wrong-label')
			}
		})
		generateQuestion(i);
		_('btn-cont').innerHTML  = "Submit Answer";
	} else{
		_('block-quiz').innerHTML = "Your score is "+ score;
	}
	flag = true;
		

}	
	

function checkAnswer(){

	if(_("opt1").checked  || _("opt2").checked  ||_("opt3").checked ){

		lbls.forEach(function(lbl){
			lbl.className += ' grayd';
		})

		var new_score = score;
		_('right-answer').style.display = "block";
		if(_("opt1").checked && (_('opt1').value === page[i].answer)){
			score++;
			_('optt1').className += ' style-label';
			_('right-answer').innerHTML = "Correct<br/>";

		} else if(_("opt1").checked){
			_('optt1').className += 'wrong-label';
			_('right-answer').innerHTML = "Incorrect<br/>";
		}

		if(_("opt2").checked &&(_('opt2').value === page[i].answer )){
			score++;
			_('optt2').className += ' style-label';
			_('right-answer').innerHTML = "Correct<br/>";
		} else if(_("opt2").checked){
			_('optt2').className += 'wrong-label';
			_('right-answer').innerHTML = "Incorrect<br/>";
		}

		
		if(_("opt3").checked &&  _('opt3').value === page[i].answer){
			score++;
			_('optt3').className += ' style-label';
			_('right-answer').innerHTML = "Correct<br/>";
		} else if(_("opt3").checked){
			_('optt3').className += 'wrong-label';
			_('right-answer').innerHTML = "Incorrect<br/>";
		}
		
		if ( new_score == score){
		//	_('right-answer').innerHTML = "Incorrect<br/>";
		}

		_('right-answer').innerHTML += page[i].answer;
		i++;
		_('btn-cont').innerHTML  = "Continue";
		flag = false;
	} else {
		console.log("Reached here")
		
	}

	
	
}


/*
* Clicke event function based on gettign the right answer or proceeding to the next question
*
*/
_("btn-cont").addEventListener('click',function(e){
	e.preventDefault();
	if(flag){
		checkAnswer();
	} else{
		nextQuestion();
	}
	
	
});
	
	


// This section is added to avoid the hot module error and warning saying full reload is needed
if (module.hot) {
  module.hot.accept();
}