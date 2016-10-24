
function computeTable() {

  var principle = $("#principle").val();
  var apr       = ($("#apr").val())*0.01;
  var terms     = $("#terms").val();


 if(principle < 0 || apr > 100 || apr < 0 || isNaN(principle) || isNaN(apr) || isNaN(terms) ){

        addErrorBox("You need to input Positive Numbers and 0 < Apr < 100");
  }
    else{

      apr = apr*0.01;
          var monthlyPayment = getMonthlyPayment(principle, apr, terms);



  $("#monthlyPayment").val("$" + monthlyPayment).hide().fadeIn("slow");



  var balance = roundToCents(principle);


  //for the first terms - 1 payments, compute the monthly numbers:
  for(var month=1; month<terms; month++) {

    var monthInterest  = (roundToCents(balance * (apr / 12))).toFixed(2);
    var monthPrinciple = (roundToCents(monthlyPayment - monthInterest)).toFixed(2);
    balance = (roundToCents(balance - monthPrinciple)).toFixed(2);




      $("#loanTable tr:last").after("<tr> <td> " +month  +
                                    "<td>" + "$" + monthInterest +  "</td> <td>"
                                    + "$"  + monthPrinciple + "</td> <td>"
                                    + "$"  + balance + "</td> </tr>" );

      $("#loanTable tr:last").hide().fadeIn("slow");

  }

  //handle the last month's payment separately
  var monthInterest  = roundToCents(balance * (apr / 12));
  var monthPrinciple = roundToCents(monthlyPayment - monthInterest);
  balance = 0;



    $("#loanTable tr:last").after("<tr> <td> " +month  +
                                    "<td>" + "$" + monthInterest +  "</td> <td>"
                                    + "$"  + monthPrinciple + "</td> <td>"
                                    + "$"  + balance + "</td> </tr>" );

      $("#loanTable tr:last").hide().fadeIn("slow");

    }
}

function getMonthlyPayment(principle, apr, terms) {

  var i = apr/12;

  var pay = principle*i/(1 - Math.pow(1 + i, -terms));

  return roundToCents(pay);

}

function roundToCents(amount) {
    return Math.round(amount * 100) / 100;
}


function addErrorBox(errorMessage) {
  var errorDiv = '<div class="alert alert-danger alert-dismissible" role="alert">' +
                 '<button type="button" class="close" data-dismiss="alert">' +
                 '<span aria-hidden="true">&times;</span>' +
                 '<span class="sr-only">Close</span></button>' +
                 '<strong>ERROR!</strong> '+errorMessage+'</div>';
  $('#errorArea').empty();
  $('#errorArea').append(errorDiv);
  $('#errorArea').hide().fadeIn("slow");
}
