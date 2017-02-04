$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });




function submitSession() {
    var playerName1 =  $('select[name=Player1]').val();
    var playerName2 =  $('select[name=Player2]').val();
    var deckName1 =  $('select[name=Deck1]').val();
    var deckName2 =  $('select[name=Deck2]').val();
    var playerWins1 = $("input[name='quant[1]']").val();
    var playerWins2 = $("input[name='quant[2]']").val();

    var databasewin1 = firebase.database().ref('decks/' + deckName1 +'/wins');
    
    databasewin1.transaction(function(wins) {
            win = parseInt(playerWins1);
            while(win >0){
                wins = wins + 1;
                win--;
            }
            return wins;
        });
    var databaselose1 = firebase.database().ref('decks/' + deckName1 +'/loses');
    databaselose1.transaction(function(loses) {
            lose = parseInt(playerWins2);
            while(lose >0){
                loses = loses + 1;
                lose--;
            }
            return loses;
        });
    
    var databasewin2 = firebase.database().ref('decks/' + deckName2 +'/wins');
    
    databasewin2.transaction(function(wins) {
            win = parseInt(playerWins2);
            while(win >0){
                wins = wins + 1;
                win--;
            }
            return wins;
        });
    var databaselose2 = firebase.database().ref('decks/' + deckName2 +'/loses');
    databaselose2.transaction(function(loses) {
            lose = parseInt(playerWins1);
            while(lose >0){
                loses = loses + 1;
                lose--;
            }
            return loses;
        });

    var databasematch1 = firebase.database().ref('matchup/' + deckName1 + deckName2 + '/' + deckName1);
    
    databasematch1.transaction(function(wins) {
            win = parseInt(playerWins1);
            while(win >0){
                wins = wins + 1;
                win--;
            }
            return wins;
        });
    var databasematch2 = firebase.database().ref('matchup/' + deckName1 + deckName2 + '/' + deckName2);
    
    databasematch2.transaction(function(wins) {
            win = parseInt(playerWins2);
            while(win >0){
                wins = wins + 1;
                win--;
            }
            return wins;
        });
    
    
}