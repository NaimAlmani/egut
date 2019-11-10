<!DOCTYPE html>
<html>

<head>
     <meta charset="utf-8">
    <title>Restad Gard utbildning AB</title>
   +trapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

</head>

<body>
    <style>
    .activityContainer{
        width:100%;
        height:100%
    }
    .activityLink{
        text-decoration: none;

    }
    .imgCont:{
        width:100%;
        height:200px;
        overflow:hidden;
    }
    .actImage{
        width:100%;
        height:auto;
    }
    .actName{
        display: block;
        width:100%;
        font-size:1em;
        text-align: center
    }
     .header {

        }
        .logoCont{
            text-align: center;
        }
        .logo{
            width:50px;
            height:50px;
        }
        .titleText{
            font-weight: bold;
            font-size: 1.1em;
        }
        .recieverName{
            font-style: italic;
            font-size: 1em;
            color:#FF5722
        }
        .message{
            text-align: center;
        }
        .infoCont{
            margin:20px;
            text-align: left;
        }
        .footerCont{
            text-align: right;
            font-size: 12px;
        }
        .greeting{
            text-align: right;
            font-style: italic;
        }

    </style>
   <div className="container">
        <div class="header">
        <div class="logoCont">
            <img class="logo" src="https://restadgard-utb.se/images/logoRG.jpg" />
           <div class="titleText"> Restad Gård utb </div>
        </div>
    </div>
       <h5>Våra Aktiviteter</h5>
       <div class="row">
    @foreach($data as $act)
    <div class="col col-lg-3 ">
        <a href={{"https://restadgard-utb.se/activity/".$act->id}} class="activityLink">
        <div class="activityContainer">
            <div class="imgCont">
                <img src={{"https://service.restadgard-utb.se/images/".$act->logoPath}} class="actImage">
            </div>
            <p class="actName">
            {{$act->name}}
        </div>
    </div>
    @endforeach
   </div>
   <p class="greeting">med vänliga hälsningar</p>
    <hr />
    <div class="footerCont">
        <div class="infoCont">
        <a class="link" href='mailto:info@restadgard-utb.se'>
            <p >E-post: info@restadgard-utb.se</p>
        </a>
        <a class="link" href='tel:0762143512'>
            <p >Tel: 0762143512</p>
        </a>
        <a class="link" target='#' href='https://g.page/RG-UTB?share'>
            <p >Address: Kungsladugårdsvägen </p>
            <p > 462 54 Vänersborg</p>
        </a>
        </div>

    </div>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>
