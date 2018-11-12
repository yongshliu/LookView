<?php
  echo "now";
  require_once 'Zend/Mail/Message.php';
  require_once 'Zend/Mail/Transport/Smtp.php';
  require_once 'Zend/Mail/Transport/SmtpOptions.php';
  
  echo "s";
  $message = new Message();
  echo "start";
  $message->addTo('livylau@sina.cn');
  $message->addFrom('lookviewadmin@163.com');
  $message->setSubject('Greetings!');
  $message->setBody("I can fly in the email");

  // Setup SMTP transport using LOGIN authentication
  
  $transport = new Smtp();
  $options   = new SmtpOptions(array(
    'name'              => 'lookviewadmin',
    'host'              => 'smtp.163.com',
    'connection_class'  => 'login',
    'connection_config' => array(
        'username' => 'lookviewadmin',
        'password' => 'lookviewpwd',
    ),
));
echo "set options";
$transport->setOptions($options);
echo "send the email";
$transport->send($message);
echo "done"
/*
  require_once 'Zend/Mail.php';
  require_once 'Zend/Mail/Transport/Smtp.php';
  $tr=new Zend_Mail_Transport_Smtp("smtp.163.com",
                                array('auth'=>'login',
                                   'port'=> '25',
                                      'username'=>'xxxx@163.com',
                                      'password'=>'xxxxx'));    //发件人邮箱和密码
        $mail = new Zend_Mail('UTF-8');
        $mail->setSubject('This is a test email');
        $mail->setFrom("<a style="FONT-FAMILY: 微软雅黑,Microsoft YaHei; FONT-SIZE: 14px; TEXT-DECORATION: underline" href="mailto:xxxx@163.com",'aaa'">xxxx@163.com",'aaa');   //发件人邮箱
        $mail->addTo("<a style="FONT-FAMILY: 微软雅黑,Microsoft YaHei; FONT-SIZE: 14px; TEXT-DECORATION: underline" href="mailto:xxxx@126.com",'aaa'">xxxx@126.com",'aaa');    //收件人邮箱
        $mail->setBodyText('');
        $mail->setBodyHtml("Test EmailTest email Test email");
 
  if(false == $mail->send($tr) ) {
     echo ("fail");
  }
  else {
  
   echo ("success");
  }
        $tr->__destruct();
*/
 

?> 
