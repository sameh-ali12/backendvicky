"use strict";

var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt-nodejs"),
  User = mongoose.model("User"),
  nodemailer = require("nodemailer"),
  PartnerSell = mongoose.model("partnersells"),
  TransferMoney = mongoose.model("transfers"),
  Product = mongoose.model("products"),
  Store = mongoose.model("stores"),
  Treasury = mongoose.model("treasuries");


// function formatedError(err) {
//   var count = 0;
//   for (var errName in err.errors) {
//     count++;
//   }
//   var replay = [];
//   var result;
//   var first;
//   for (var i = 0; i < count; i++) {
//     first = err.errors[Object.keys(err.errors)[i]];
//     replay.push({ type: "error", message: first.message });
//   }
//   result = { type: "error", errors: replay };
//   return result;
// }
function sendemail(email, token) {
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "samehali@locationtop.com",
      pass: "QWqw1234",
    },
  });

  let mailOptions = {
    from: '"I monitor 👻" <admin@integration.com>', // sender address
    to: email, // list of receivers
    subject: "Rest Password I-mointor.", // Subject line
    text: "For change your password please press  follow link blew", // plain text
    html:
      `<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!------ Include the above in your HEAD tag ---------->
    
    <!DOCTYPE html>
    <html>
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                }
            }
    
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
    
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#3CBEB2" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#3CBEB2" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 300; margin: 2;">Please Press Button Blow to Rest Your Password</h1> <img src="https://scontent.fdmm1-1.fna.fbcdn.net/v/t1.15752-0/p280x280/90743360_195700785182860_10369090434629632_n.jpg?_nc_cat=104&_nc_sid=b96e70&_nc_ohc=UuLjic3_sSUAX-jSIt7&_nc_ht=scontent.fdmm1-1.fna&_nc_tp=6&oh=b3e29dcd2050bf63626b28844c739d1e&oe=5E9A9B34" width="300" height="300" style="display: block; border: 0px;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#3CBEB2"><a href="https://integration-art.web.app/#/restpassword/` +
      token +
      `" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #3cbeb2; display: inline-block;">Rest Password</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Thanks for choosing our service,<br>I-monitor Team</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #3cbeb2;">We’re here to help you out</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                            <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                        </td>
                    </tr>
                </table>
                
            </td>
        </tr>
    </table>
    </body>
    </html>`,
    // html: '<a href="http://localhost:4200/#/restpassword/'+token+'">please click this link </a>'  // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log("here we sent message ");
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: %s", info);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    transporter.close();
  });
}
exports.register = function (req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};
exports.sign_in = function (req, res) {

  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.json({
          code: 20,
          message: "Authentication failed. Invalid user or password.",
        });
      }
      var token = jwt.sign(
        {
          email: user.email,
          fullName: user.fullName,
          _id: user._id,
          role: user.role,
        },
        "RESTFULAPIs"
      );

      console.log(user.name);
      return res.json({
        code: 100,
        token: token,
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name

      });
    }
  );
};
exports.forgetpassword = function (req, res) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) throw err;
      if (!user) {
        return res.json({
          code: 20,
          status: false,
          message: "wrong email address",
        });
      } else {
        user.restpassword = jwt.sign(
          {
            email: user.email,
            fullName: user.fullName,
            _id: user._id,
            role: user.role,
          },
          "RESTFULAPIs",
          { expiresIn: "24h" }
        );
        user.save(function (err) {
          if (err) throw err;
        });
        sendemail(user.email, user.restpassword);
        return res.json({
          code: 100,
          status: true,
          message: "please check your email",
        });
      }
    }
  );
};
exports.restpassword = function (req, res) {
  User.findOne({ restpassword: req.params.token }, function (err, user) {
    if (err) throw err;
    console.log(user);
    if (user) {
      user.restpassword = "";
      user.hash_password = bcrypt.hashSync(req.body.password);
      user.save(function (err) {
        if (err) throw err;
        else {
          res.json({
            code: 100,
            status: true,
            user: user,
          });
        }
      });
    } else {
      res.json({
        code: 20,
        status: false,
        message: "link has expired",
      });
    }
  });
};
exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!!!!" });
  }
};

exports.getusersallowed = function (req, res, next) {
  User.find({ _id: { $nin: req.params.id } }, function (err, users) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: users });
    }
  })
    .select("name")
    .select("_id");
};

exports.edituser = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, user) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: user });
    }
  });
};

exports.singleuser = function (req, res) {
  User.find({ _id: req.params.id }, function (err, user) {
    if (err) {
      return res.json({ code: 21, message: err });
    } else {
      return res.json({ code: 100, obj: user });
    }
  });
};

exports.singleuserallinfo = function (req, res) {
  User.find({ _id: req.params.id})
    .populate(
      {
        path: "partners.buybills",
        model: PartnerSell,
        populate: [
          {
            path: "from",
            model: User,
          },
          {
            path: "to",
            model: User,
          },
        ],
      })
      .populate(
        {
          path: "partners.buybills",
          model: PartnerSell,
          populate: [
            {
              path: "details.productid",
              model: Product
            }
          ],
        })
        .populate(
          {
            path: "partners.buybills",
            model: PartnerSell,
            populate: [
              {
                path: "fromtreasury",
                model: Treasury
              }
            ],
          })
          .populate(
            {
              path: "partners.buybills",
              model: PartnerSell,
              populate: [
                {
                  path: "tostore",
                  model: Store
                }
              ],
            })
      .populate(
        {
          path: "partners.sellbills",
          model: PartnerSell,
          populate: [
            {
              path: "from",
              model: User,
            },
            {
              path: "to",
              model: User,
            },
          ],
        })
        .populate(
          {
            path: "partners.sellbills",
            model: PartnerSell,
            populate: [
              {
                path: "details.productid",
                model: Product
              }
            ],
          }).populate(
            {
              path: "partners.sellbills",
              model: PartnerSell,
              populate: [
                {
                  path: "details.fromstore",
                  model: Store
                }
              ],
            })
            .populate(
              {
                path: "partners.sellbills",
                model: PartnerSell,
                populate: [
                  {
                    path: "totreasury",
                    model: Treasury
                  }
                ],
              })
        .populate(
          {
            path: "partners.transferfromus",
            model: TransferMoney,
            populate: [
              {
                path: "from",
                model: User,
              },
              {
                path: "to",
                model: User,
              },
            ],
          }).populate(
            {
              path: "partners.transferfromus",
              model: TransferMoney,
              populate: [
                {
                  path: "fromtreasury",
                  model: Treasury,
                }
              ],
            })
          .populate(
            {
              path: "partners.transferfromhim",
              model: TransferMoney,
              populate: [
                {
                  path: "from",
                  model: User,
                },
                {
                  path: "to",
                  model: User,
                },
              ],
            }).populate(
              {
                path: "partners.transferfromhim",
                model: TransferMoney,
                populate: [
                  {
                    path: "totreasury",
                    model: Treasury,
                  }
                ],
              })
    .exec(function (err, doc) {
      res.json({code:100,obj:doc});
    });

  
};
