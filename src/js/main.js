
import questions from './questions.json';

var i= 0;
var score = 0;
var page = questions.questions;
var flag = true;

//var oldHtml = _('block-quiz').innerHTML;
var oldHtml

 
generateQuestion(0);

function _(id){
 return document.getElementById(id);
}

/*
* Following function is to generate the next question
*
*/

function generateQuestion(num){
	
	_('right-answer').style.display = "none";

	for( var x = 1; x<4 ; x++){
		_("opt"+x).checked = false;
	}
	
	_('question').innerHTML = page[num].heading;
	_('question-desc').innerHTML = page[num].text_description;
	_('optt1').innerHTML = `<span></span>`+page[num].choices[0]
	_('optt2').innerHTML = `<span></span>`+page[num].choices[1]
	_('optt3').innerHTML = `<span></span>`+page[num].choices[2]
	_('opt1').value = page[num].choices[0]
	_('opt2').value = page[num].choices[1]
	_('opt3').value = page[num].choices[2]

}

/*
* Following function is to call the generate function for the next question
*
*/
function nextQuestion(){
	//console.log(i);
	var lbls = document.querySelectorAll('.choice-lbl')
	if(page.length > i){
		lbls.forEach(function(lbl){

			var classes = ['grayd','style-label','wrong-label'];
			for( var y=0; y < classes.length; y++){

				if(lbl.classList.contains(classes[y])){

					lbl.classList.remove(classes[y]);
				}
			}
			lbl.previousElementSibling.disabled  = false;
			
		})
		_('right-answer').className = '';
		generateQuestion(i);
		_('btn-cont').innerHTML  = "Submit Answer";
		oldHtml = _('block-quiz').innerHTML;
		
	} else{
		
		_('block-quiz').innerHTML = `<h2 class='results-heading'>Results</h2><div class="score-board"><span class="scoreValue">`+ score + `<span class="on-top">out of `+page.length+`</span></span></div><button id="btn_try_again" class="btn">Try Again<span class="material-icons btn-icon"></span> <span></span></button>`
		_('btn_try_again').addEventListener('click',function(e){
			e.preventDefault();
			flag=true;
			backtoQuestionnaire();
		});
	}
	flag = true;
		

}	
	
/*
* function to check the answer
*
*/

function checkAnswer(){
	//console.log("Clicked here");
	var lbls = document.querySelectorAll('.choice-lbl')

	if(_("opt1").checked  || _("opt2").checked  ||_("opt3").checked ){

		lbls.forEach(function(lbl){
			lbl.className += ' grayd';
			lbl.previousElementSibling.disabled = true
		})

		var new_score = score;
		_('right-answer').style.display = "block";


		for(var x=1; x <4 ; x++){
		 	if(_("opt"+x).checked && (_('opt'+x).value === page[i].answer)){
				score++;
				_('optt'+x).className += ' style-label';
				_('right-answer').innerHTML = "CORRECT<br/>";
				_('right-answer').className += " correctBlock";
				//_('right-answer').classList += "right";

			} else{
				if(_("opt"+x).checked){
					_('optt'+x).className += ' wrong-label';
					_('right-answer').className += " incorrectBlock"
					_('right-answer').innerHTML = "INCORRECT<br/>";
				} else{
					if(_('opt'+x).value === page[i].answer){
						_('optt'+x).className += ' style-label';
					}
				}
			} 
			
			 
		}
		
		
		if ( new_score == score){
		//	_('right-answer').innerHTML = "Incorrect<br/>";
		}

		_('right-answer').innerHTML += page[i].answer;
		i++;

		_('btn-cont').innerHTML  = "Continue";
		flag = false;

		var progress = ( i / page.length );
		var percent = progress * 100;
		_('bar').style.width = percent+'%';
		console.log(percent);

	}

		
	
}

/**
* function to repeat quiz
*
*/

function backtoQuestionnaire(){

	_('block-quiz').innerHTML = oldHtml;

	generateQuestion(0);
	i=0;
	score = 0;
	_('bar').style.width = 0 +'%';
	btnClick();
}

/*
* Clicked event function based on gettiing the right answer or proceeding to the next question
*
*/

function btnClick(){
	_("btn-cont").addEventListener('click',function(e){

		e.preventDefault();
		if(flag){
			checkAnswer();
		} else{
			nextQuestion();
		}
	
	
	});
}

function markProgress(){



}



document.addEventListener('DOMContentLoaded',function(event){

	btnClick();

});
	


// This section is added to avoid the hot module error and warning saying full reload is needed
if (module.hot) {
  module.hot.accept();
}