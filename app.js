$(document).ready(function () {
  // MakeSort()
  var dataInput = [];
  if (localStorage.getItem('dataInput')) {
    var out = JSON.parse(localStorage.getItem('dataInput'));
    $(out).each(function (index, value) {
      index = index + 1
      console.log(value)
      var SubHead_in_Head = $(this).text() 
      console.log(SubHead_in_Head)
      $('main').append('<section><h1>'+ value.title +  '</h1><button class="btn-cross" id="second" onclick="removeItem(this)">X</button></section>')
      $('.Head1 select').append("<option value=" + index + ">" + value.title +  "</option>")
      $('.Head2 select').append("<option value=" + index + ">" + value.title + "</option>")
      $(value.subheading).each(function (index1, value1) {
        var Head = index
        var SubHead = index1 + 3;
        $("main section:nth-child(" + Head + ")").append("<div class='container'><h5>" + value1.subtitle +  "</h5><button class='btn-cross' id='second' onclick='removeItem(this)'>X</button></div>");
        $(value1.form).each(function (index2, value2) {
          index2 = index2 + 1;
          // debugger;
          $("main section:nth-child(" + Head +  ") div:nth-child(" + SubHead + ")").append("<p class='input'>" + value2 + " </p>");

        })
      })
    })

  }


  $(".Form_Category").submit(function (event) {
    event.preventDefault();
    var textinput = $(".HeadingForm").val();
    console.log(textinput)
    $('main').append('<section><h1>'+ textinput +  '</h1><button class="btn-cross" id="second" onclick="removeItem(this)">X</button></section>');
    $('.SubCategory option').remove()
    $('.Head1 select ').append("<option value='' selected disabled>--Select Heading--</option>")
    $('.Head2 select option').remove()
    $('.Head2 select ').append("<option value='' selected disabled>--Select Heading--</option>")

    $('main section h1').each(function (key) {
      key = key + 1
      console.log(this)
      var SubHead_in_Head = $(this).text()
      console.log(SubHead_in_Head)
      
      $('.Head1 select').append("<option value=" + key + ">" + SubHead_in_Head + " </option>")
      $('.Head2 select').append("<option value=" + key + ">" + SubHead_in_Head + "</option>")

    })
    Dataitem();
    
    $('.Form_Category')[0].reset();
    // MakeSort();
  });



  $(".SubCategory").submit(function (event) {
    event.preventDefault();
    var heading = $('.Head_drp').val();
    var textinput = $(".text-1").val();
    console.log(textinput, heading)

    $("main section:nth-child(" + heading + ")").append("<div class='container'><h5>" + textinput + "</h5><button class='btn-cross' id='second' onclick='removeItem(this)'>X</button></div>" );
    $('.Head3 select option').remove()
    $('.Head3 select ').append("<option value='' selected disabled>--Select Heading--</option>")
    Dataitem();
    
    $('.SubCategory')[0].reset();
    $('main .container h5').each(function (key) {
      key = key + 1
      console.log(this)
      var sub_in_form = $(this).text()
      console.log(sub_in_form)
      $('.Head3 select').append("<option value=" + key + ">" + sub_in_form + "</option>")
    })
    // MakeSort();
  });




  $(document).ready(function () {
    $('.form_Head').on('change', function (event) {
      var h = $(this).val()
      console.log(h)
      // $('.form_Head option').remove()
      // $(".form_Head").append("<option value='' selected disabled>--Select Heading--</option>")
      $('.form_Sub option').remove()
      $(".form_Sub").append("<option value='' selected disabled>--Select Sub-Heading--</option>")
      $("main section:nth-child(" + h + ") div h5 ").each(function (key) {
        key = key + 3
        console.log(key)
        var sub_heading = $(this).text()
        console.log(sub_heading)
        $('.form_Sub').append("<option value=" + key + ">" + sub_heading + " </option>")
      })
    })
    $(".form-3").submit(function (event) {

    event.preventDefault();
          
      var heading = $('.form_Head').val();

      console.log(heading)
      var sub_heading = $('.form_Sub').val();
      console.log(sub_heading)

      var textinput3 = $('.Down').val();

      var cls = $(".cls7").val();
      var id = $(".id7").val();
      var lbl = $(".lbl7").val();
      var ph = $(".ph7").val();
      var val = $(".val7").val();
      var nam = $(".nam7").val();
      var act = $(".act7").val();
      var opt = $(".opt7").val();
      console.log(cls, textinput3, id, lbl, ph, val, nam, act, opt)
      var data = '<lable> '+ lbl + '</lable><br><input type="' + textinput3 + '" class="' + cls + '" id="' + id + '" label="' + lbl + '" placeholder="' + ph + '" value="' + val + '" name="' + nam + '" action="' + act + '" option="' + opt + '" />'
      // debugger;
      $("main section:nth-child(" + heading + ") div:nth-child(" + sub_heading + ")").append("<p class='input'>" + data + " <br><button class='btn-cross' onclick='removeItem(this)'>X</button></p>");
      
      
      $('.form-3')[0].reset();
    
   
      Dataitem();
      // MakeSort();
      
    });
  });
});



function Dataitem() {
  
  dataInput = []
  $('main section').each(function (key) {
    key = key + 1
    var a = $(this).children('h1').text()
    var hmd = []
    $(this).children('div h5').each(function (event) {
      console.log($(this).text())
    })
    $("main section:nth-child(" + key + ") div").each(function (n) {
      console.log($(this).text(), a)
      var Sub_H = $(this).children('h5').text()
      var shmd = []
      n = n + 3
      $("main section:nth-child(" + key + ") div:nth-child(" + n + ") p").each(function (r) {
        
        shmd.push(([$(this).html()]))
      })
      hmd.push({ subtitle: Sub_H, form: shmd })

    })
    dataInput.push({ 'title': a, 'subheading': hmd })
    localStorage.setItem('dataInput', JSON.stringify(dataInput));
    localStorage.getItem('dataInput', JSON.stringify(dataInput));

    

  })
}




// function MakeSort() {
  $(function (event) {
  $("main").sortable({
  //   change:  function (event, ui) {Dataitem()},
  // update:  function (event, ui) {Dataitem()},
  connectWith: "main",   
  update: function( event, ui ) {
    Dataitem();
  }
    
  });

$("section").sortable({
  // change:  function (event, ui) {Dataitem()},
  // update:  function (event, ui) {Dataitem()},
  connectWith: "section",
    cancel: "h1",
  update: function( event, ui ) {
    Dataitem();
    }
    
  });

  $(".container").sortable({
  //   change:  function (event, ui) {Dataitem()},
  // update:  function (event, ui) {Dataitem()},
    connectWith: "div",
    cancel: "h5 , #second  ",
    update: function( event, ui ) {
       Dataitem();
       }

  });
  $("main section").disableSelection();
    Dataitem();
}); 



function removeItem(Dlt){
  $(Dlt).parent().remove();
    Dataitem();
} 

/*
// $("p ").sortable({
//   connectWith: "p",
//     // cancel: "p",    
//   update: function( event, ui ) {
//     Dataitem();
//     }   
//   });

/* $(".input button").sortable({
  change:  function (event, ui) {Dataitem()},
  update:  function (event, ui) {Dataitem()},
   connectWith: ".input button"  ,
  //  axis: "y X " ,
    cancel: " h5 ",

    

    // cancel: "p", 
  //   dropOnEmpty: true,
  // revert: true,           
  // tolerance: 'pointer',
  // placeholder: "ui-state-highlight",
  // cursor: 'pointer',
  // dropOnEmpty: true,
  // forcePlaceholderSize: true  , 
        
// update: function( event, ui ) {
//     Dataitem();
    
//     }   
  }); */
  
// $("main section").disableSelection();
//   Dataitem();









/* function removeItemForm(sunil) {
  // $(sunil).parent().remove();
  // console.log($(sunil).parent().find('p').html())
  $(sunil).parent().find('p').remove()
    Dataitem();
} */

// function removeItemSub(sunil) {
//   // $(sunil).parent().remove();
//   // console.log($(sunilSub).parent().find('h5').html())
//   $(sunil).parent().find('h5').remove()
//   // Dataitem();
//   // $(sunil).remove();
//   // Dataitem();
//   // $(sunil).parent().find('button').remove()
//     Dataitem();
// }
/* function removeItemHead(sunilHead) {
  // $(sunil).parent().remove();
  console.log($(sunilHead).parent().find('h1').html())
  
  // $(sunilHead).parent().find('h1').remove()
  //   Dataitem();
} */

/*function removeItemSub(aSub){
  $(aSub).parent().find('h5').remove()
  Dataitem();
}*/




// function removeItem(sunil,ttype) {
//   $(sunil).parent().remove();
  
// }

// "<button class='btn-cross' onclick='removeItem(this)'>X</button>






