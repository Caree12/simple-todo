// Carrie Wladis

var todoCollection = [],
	count = 0;

//ON ENTER KEYBOARD ADD A NEW TODO, UPDATE THE COUNTER, AND UNHIDE SECTIONS
$('.new-todo').keypress( function(e) {
	if( (e.which === 13 ) && $('.new-todo').val() !== null) {
		
		if( !$('.new-todo').val()) {
			$('.new-todo').attr('placeholder', 'Not a valid value');
		
		} else {
			//counts the number of todos for the counter in the footer
			count++;

			if (count > 1) {
				$('.todo-count').html(count + ' items left');
			} else if (count = 1) {
				//remove 'hidden' from .main and .footer
				$('.js-hide').removeClass("hidden");
				$('.todo-count').html(count + ' item left');
			} else {
				$('.todo-count').html(count + ' item left');
				$('.js-hide').addClass("hidden");
				todoCollection.length = 0;
			}
		
			var newTodo = $('.new-todo').val().trim();

			var Todos = {
				id: _.uniqueId(),
				content: newTodo,
				completed: false,
			};

			var todoItem = '<li class="todo-item" contentedible="true" data-todo="' + Todos.id +'"><div class="view"><input class="toggle js-check-complete" type="checkbox"><label>' + newTodo + '</label><button class="destroy"></button></div><input class="edit" value="' + Todos.content + '"></li>'
			$('.todo-list').append(todoItem);

			todoCollection.push(Todos);

			$('.new-todo').val('');
		}
	}
});


//CHANGE COMPLETED STATE ON INDIVIDUAL LI/INPUT CLICK
$('.todo-list').on('click', '.js-check-complete', function () {
	var dataTodo = $(this).parents('li').attr('data-todo');
	$(this).parents('li').toggleClass('completed');

	var clickedTodo = _.findWhere(todoCollection, { id: dataTodo });
	clickedTodo.completed = !clickedTodo.completed;

	$('.clear-completed').removeClass('hidden');
});

//ADD CLASS EDIT TO LI 
$('.todo-list').on('dblclick', 'label', function () {
	$(this).parents('li').addClass('editing');	

	//STILL NEED TO SET THE VALUE OF THE INPUT ON ENTER KEYPRESS AND REMOVE 
});


//TOGGLE ALL COMPLETED ON MAIN INPUT ICON CLICK
$('.js-checkall-complete').on('click', function() {
	if($(this).hasClass('all')){
		$('.todo-list').find('.todo-item').removeClass('completed');
		$(this).removeClass('all');
		$('.clear-completed').addClass('hidden');
	} else {
		$('.todo-list').find('.todo-item').not('completed').addClass('completed');
		$(this).addClass('all');
		$('.clear-completed').removeClass('hidden');
	}
});


//CLEAR ALL COMPLETED TODOS ON 'CLEAR COMPLETED' CLICK
$('.clear-completed').on('click', function() {
	$('.todo-list').find('.completed').remove();

	//NEEDED MORE TIME TO CLEAR THE COMPLETED VALUES FROM THE ARRAY AND UPDATE THE COUNTER IN THE FOOTER
	// var completedTodos = _.findWhere(todoCollection, { completed: true });
	// console.log(completedTodos);
	// todoCollection.pop(completedTodos);

});


//REMOVE ITEMS FROM THE LIST ON X CLICK
$('.todo-list').on('click', '.destroy', function () {
	count--;
	todoCollection.pop(this);
	$(this).parent().remove();
	$('.todo-count').html(count + ' items left');

	if (count === 0) {
		$('.js-hide').addClass("hidden");
		todoCollection.length = 0;
		$('.clear-completed').addClass('hidden');
	}
});




