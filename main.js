(function () {
    var gameArray = [];
    var boxCounter = 0;
    var cardA, cardB;
    var counter = 0;
    var pause = false;

    function restCards() {
        $(".square").attr("data-state", "close");
        $(".square").removeClass("flip")
        cardA = "";
        cardB = "";
    }

    function checkWinning() {
        if (counter == 6) {
            
            $(".match").addClass("win")
        }
    }

    function CheckMatch() {
        pause = true;
        console.log(pause)
        if (cardA == cardB) {
            pause = true;
            $("div[data-state='open']").addClass("match")
            $("div[data-state='open']").removeClass("flip")
            counter++;
            $("#counter").html(counter);
        }
        setTimeout(function () {
            restCards();
            pause = false;
            checkWinning();
        }, 1200)
    }

    function rememberCard(data) {
        if (cardA) {
            cardB = data;
        }
        else {
            cardA = data;
        }
    }

    function forgetCard() {
        if (cardB) {
            cardB = ""
        }
        else {
            cardA = ""
        }
    }
    $(function () {
        $("#board .square").click("slow", function () {
            if (pause) return;
            $(this).toggleClass("flip")
            var content = $(this).find(".content").html().trim();
            if ($(this).attr("data-state") == "close") {
                rememberCard(content);
                $(this).attr("data-state", "open")
            }
            else {
                forgetCard();
                $(this).attr("data-state", "close")
            }
            var openCards = $("div[data-state='open']").length;
            if (openCards == 2) {
                CheckMatch();
            }
            if (!content) {}
        })
    })
})();