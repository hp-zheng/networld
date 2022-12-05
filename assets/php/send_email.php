<?php

// 使用 filter_var() 过滤 email
function spamcheck($field) {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return TRUE;
    } else {
        return FALSE;
    }
}

// 如果接收到邮箱参数则发送邮件
if (isset($_REQUEST['email'])) {
	$mailcheck = spamcheck($_REQUEST['email']);
    if ($mailcheck == FALSE) {
        echo "Invalid email.";
    } else {    
        // 发送邮件
		$name = $_POST['name'];
        $mail_from = $_REQUEST['email'] ;
        $subject = $_REQUEST['subject'] ;
        $message = $_REQUEST['message'] ;

		$mail_to = 'hao.zheng89@outlook.com';
		$headers = "From: $email_from\r\n";
		$email_body = "You have received an e-mail from $name. Here is the message:\n\n$message";
		mail($mail_to, $subject, $email_body, $headers);
        echo "Thank you for using my email form!";
    }
}

?>
