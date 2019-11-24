<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      body {
        margin: 0 !important;
        padding: 15px;
        background-color: #fff;
      }
      .wrapper {
        width: 100%;
        table-layout: fixed;
      }
      .wrapper-inner {
        width: 100%;
        background-color: #eee;
        max-width: 670px;
        margin: 0 auto;
      }
      table {
        border-spacing: 0;
        font-family: sans-serif;
        color: #727f80;
      }
      .outer-table {
        width: 100%;
        max-width: 670px;
        margin: 0 auto;
        background-color: #fff;
      }
      td {
        padding: 0;
      }
      .header {
        background-color: #c2c1c1;
        border-bottom: 3px solid #81b9c3;
      }
      p {
        margin: 0;
      }
      .header p {
        text-align: center;
        padding: 1%;
        font-weight: 500;
        font-size: 11px;
        text-transform: uppercase;
      }
      a {
        color: #f1f1f1;
        text-decoration: none;
      }
      /*--- End Outer Table 1 --*/
      .main-table-first {
        width: 100%;
        max-width: 610px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 6px;
        margin-top: 25px;
      }
      /*--- Start Two Column Sections --*/
      .two-column {
        text-align: center;
        font-size: 0;
        padding: 5px 0 10px 0;
      }
      .two-column .section {
        width: 100%;
        max-width: 300px;
        display: inline-block;
        vertical-align: top;
      }
      .two-column .content {
        font-size: 16px;
        line-height: 20px;
        text-align: justify;
      }
      .content {
        width: 100%;
        padding-top: 20px;
      }
      .center {
        display: table;
        margin: 0 auto;
      }
      img {
        border: 0;
      }
      img.logo {
        float: left;
        margin-left: 5%;
        max-width: 200px !important;
      }
      #callout {
        float: right;
        margin: 4% 5% 2% 0;
        height: auto;
        overflow: hidden;
      }
      #callout img {
        max-width: 20px;
      }
      .social {
        list-style-type: none;
        margin-top: 1%;
        padding: 0;
      }
      .social li {
        display: inline-block;
      }
      .social li img {
        max-width: 15px;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      /*--- Start Outer Table Banner Image, Text & Button --*/
      .image img {
        width: 100%;
        max-width: 670px;
        height: auto;
      }
      .main-table {
        width: 100%;
        max-width: 610px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 6px;
      }
      .one-column .inner-td {
        font-size: 16px;
        line-height: 20px;
        text-align: justify;
      }
      .inner-td {
        padding: 10px;
      }
      .h2 {
        text-align: center;
        font-size: 23px;
        font-weight: 600;
        line-height: 45px;
        margin: 12px;
        color: #4a4a4a;
      }
      p.center {
        text-align: center;
        max-width: 580px;
        line-height: 24px;
      }
      .button-holder-center {
        text-align: center;
        margin: 5% 2% 3% 0;
      }
      .button-holder {
        float: right;
        margin: 5% 0 3% 0;
      }
      .btn {
        font-size: 15px;
        font-weight: 600;
        background: #81bac6;
        color: #fff;
        text-decoration: none;
        padding: 9px 16px;
        border-radius: 28px;
      }
      /*--- Start Two Column Image & Text Sections --*/
      .two-column img {
        width: 100%;
        max-width: 280px;
        height: auto;
      }
      .two-column .text {
        padding: 10px 0;
      }
      /*--- Start 3 Column Image & Text Section --*/
      .outer-table-2 {
        width: 100%;
        max-width: 670px;
        margin: 22px auto;
        background-color: #c2c1c1;
        border-bottom: 3px solid #81b9c3;
        border-top: 3px solid #81b9c3;
      }
      .three-column {
        text-align: center;
        font-size: 0;
        padding: 10px 0 30px 0;
      }
      .three-column .section {
        width: 100%;
        max-width: 200px;
        display: inline-block;
        vertical-align: top;
      }
      .three-column .content {
        font-size: 16px;
        line-height: 20px;
      }
      .three-column img {
        width: 100%;
        max-width: 125px;
        height: auto;
      }
      .outer-table-2 p {
        margin-top: 6px;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        line-height: 23px;
      }
      /*--- Start Two Column Article Section --*/
      .outer-table-3 {
        width: 100%;
        max-width: 670px;
        margin: 22px auto;
        background-color: #c2c1c1;
        border-top: 3px solid #81b9c3;
      }
      .h3 {
        text-align: center;
        font-size: 21px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #4a4a4a;
      }
      /*--- Start Bottom One Column Section --*/
      .inner-bottom {
        padding: 22px;
      }
      .h1 {
        text-align: center !important;
        font-size: 25px !important;
        font-weight: 600;
        line-height: 45px;
        margin: 12px 0 20px 0;
        color: #4a4a4a;
      }
      .inner-bottom p {
        font-size: 16px;
        line-height: 24px;
        text-align: justify;
      }
      /*--- Start Footer Section --*/
      .footer {
        width: 100%;
        background-color: #c2c1c1;
        margin: 0 auto;
        color: #fff;
      }
      .footer img {
        max-width: 135px;
        margin: 0 auto;
        display: block;
        padding: 4% 0 1% 0;
      }
      p.footer {
        text-align: center;
        color: #fff !important;
        line-height: 30px;
        padding-bottom: 4%;
        text-transform: uppercase;
      }
      /*--- Media Queries --*/
      @media screen and (max-width: 400px) {
        .h1 {
          font-size: 22px;
        }
        .two-column .column,
        .three-column .column {
          max-width: 100% !important;
        }
        .two-column img {
          width: 100% !important;
        }
        .three-column img {
          max-width: 60% !important;
        }
      }
      @media screen and (min-width: 401px) and (max-width: 400px) {
        .two-column .column {
          max-width: 50% !important;
        }
        .three-column .column {
          max-width: 33% !important;
        }
      }
      @media screen and (max-width: 768px) {
        img.logo {
          float: none !important;
          margin-left: 0% !important;
          max-width: 200px !important;
        }

        #callout {
          float: none !important;
          margin: 0% 0% 0% 0;
          height: auto;
          text-align: center;
          overflow: hidden;
        }
        #callout img {
          max-width: 26px !important;
        }
        .two-column .section {
          width: 100% !important;
          max-width: 100% !important;
          display: inline-block;
          vertical-align: top;
        }

        .two-column img {
          width: 100% !important;
          height: auto !important;
        }
        img.img-responsive {
          width: 100% !important;
          height: auto !important;
          max-width: 100% !important;
        }
        .content {
          width: 100%;
          padding-top: 0px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="wrapper-inner">
        <table class="outer-table"></table>
        <!--- End Outer Table -->
        <table class="main-table-first">
          <tr>
            <td class="two-column">
              <div class="section">
                <table width="100%">
                  <tr>
                    <td class="inner-td">
                      <table class="content">
                        <tr>
                          <td align="center">
                            <img
                              style="width: 100px;"
                              src="https://service.restadgard-utb.se/images/rg.png"
                              class="logo"
                            />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <!--- End First Column of Two Columns -->
              <div class="section">
                <table width="100%">
                  <tr>
                    <td class="inner-td">
                      <table class="content">
                        <tr>
                          <td>
                            <div id="callout">
                              <ul class="social">
                                <li>
                                  <a href="#" target="_blank"
                                    ><img src="https://service.restadgard-utb.se/images/facebook.png"
                                  /></a>
                                </li>
                                <li>
                                  <a href="#" target="_blank"
                                    ><img src="googleplus.png"
                                  /></a>
                                </li>
                                <li>
                                  <a href="#" target="_blank"
                                    ><img src="https://service.restadgard-utb.se/images/twitter.png"
                                  /></a>
                                </li>
                                <li>
                                  <a href="#" target="_blank"
                                    ><img src="https://service.restadgard-utb.se/images/youtube.png"
                                  /></a>
                                </li>
                                <li>
                                  <a href="#" target="_blank"
                                    ><img src="https://service.restadgard-utb.se/images/instagram.png"
                                  /></a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <!--- End Second Column of Two Columns -->
            </td>
          </tr>
          <!--- End Two Column Section -->
        </table>

        <!--- End Main Table -->
        <table class="main-table">
          <tr>
            <td class="one-column">
              <table width="100%">
                <tr>
                  <td class="inner-td">
                    <p class="h2">Veckovis nyhetsbrev</p>
                    <p class="center">
                      vi har många aktiviteter som kan passa dina intressen
                    </p>
                    <p class="button-holder-center">
                      <a class="btn" href="https://restadgard-utb.se/activities">Se alla</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!--- End Heading, Paragraph & Button Section -->
          <tr>
            <td class="two-column">
              <!--start loop-->
               @foreach($data as $act)
              <div class="section">
                <table width="100%">
                  <tr>
                    <td class="inner-td">
                      <table class="content">
                        <tr>
                          <td>
                              <div style="width:100%; height:200px; overflow:hidden">
                            <img src={{"https://service.restadgard-utb.se/images/".$act->logoPath}} class="img-responsive" />
                              </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="text">
                            <p>
                              {{$act->name}}
                            </p>
                            <a
                              style="color:lightskyblue; float:right"
                              href={{"https://restadgard-utb.se/activity/".$act->id}}
                              >... Mer</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
                @endforeach
              <!--end loop-->
              <!--- End First Column of Two Columns -->
            </td>
          </tr>
          <!--- End Two Column Section -->
        </table>

        <!--- End Main Table -->
           <table class="outer-table-3">
          <tr>
            <td class="one-column">
              <table width="100%">
                <tr>
                  <td class="footer" style="text-align: center; padding:10px">
                    <img
                      style="width:100px"
                      src="https://service.restadgard-utb.se/images/rg.png"
                    />
                    <div
                      style="margin:0 auto; display: inline-block; text-align: left;"
                    >
                      <a
                        class="link"
                        href="mailto:info@restadgard-utb.se"
                        style="margin:10px"
                      >
                        <p>E-post: info@restadgard-utb.se</p>
                      </a>
                      <a class="link" href="tel:0762143512" style="margin:10px">
                        <p>Tel: 0762143512</p>
                      </a>
                      <a
                        class="link"
                        target="#"
                        href="https://g.page/RG-UTB?share"
                        style="margin:10px"
                      >
                        <p>Address: Kungsladugårdsvägen</p>
                        <p>462 54 Vänersborg</p>
                      </a>
                      <br /><a href={{"https://service.restadgard-utb.se/api/email/unsubscribe/".$id}} style="margin:10px"
                        >Unsubscribe</a
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!--- End Main Table -->
      </div>
      <!--- End Wrapper Inner -->
    </div>
    <!--- End Wrapper -->
    <br />
  </body>
</html>
