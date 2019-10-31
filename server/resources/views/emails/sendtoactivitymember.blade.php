<!DOCTYPE html>
<html>

<head>
    <title>Restad Gard utbildning AB</title>
</head>

<body>
    <style>
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
        .envelop{
            min-width: 300px;

            width:50%;

            border-radius: 10px;
            margin:20px auto;
          -webkit-box-shadow: 4px 10px 45px -13px rgba(0,0,0,0.36);
-moz-box-shadow: 4px 10px 45px -13px rgba(0,0,0,0.36);
box-shadow: 4px 10px 45px -13px rgba(0,0,0,0.36);
padding:10px;
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
    <div class="header">
        <div class="logoCont">
            <img class="logo" src="https://restadgard-utb.se/images/logoRG.jpg" />
           <div class="titleText"> Restadgard utb </div>
        </div>
    </div>
    <div class="envelop">
    <h4>Hej <span class="recieverName">{{$data->name}} !</span></h4>
    <p class="message">{{$data->message}}</p>
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
    </div>

</body>

</html>
