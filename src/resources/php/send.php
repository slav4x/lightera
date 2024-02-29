<?php

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'vendor/autoload.php';

  date_default_timezone_set("Europe/Moscow");

  $success = false;
  if (!empty($_POST['t'])){ $success = true; }

  if ($success){

    $mail = new PHPMailer(true);
    $mail->CharSet = "utf-8";

    $fields = [
      'name' => 'Имя',
      'phone' => 'Телефон',
      'email' => 'E-mail'
    ];

    try {
      // Настройки SMTP
      //$mail->isSMTP();
      $mail->Host = 'smtp.gmail.com';
      $mail->SMTPAuth = true;
      $mail->Username = 'ilyr.dev';
      $mail->Password = 'qAqvAoKb';
      $mail->SMTPSecure = 'ssl';
      $mail->Port = 465;

      // Настройки сообщения
      $mail->setFrom('sendmail@lightera.haier-rus.ru', 'Lightera');
      $mail->addAddress('slava.cpa@yandex.ru');
      $mail->isHTML(true);

      $form_name = 'Заявка с сайта';

      $body = '<style>table,td{border:1px solid #ddd}table{width:100%;border-spacing:0;border-collapse:collapse}td{padding:10px;}td:nth-child(1){width:40%;}td:nth-child(2){width:60%;}</style>';
      $body .= '<table>';
      foreach ($_POST as $key => $value) {
        if ($key == 't') continue;

        $displayName = array_key_exists($key, $fields) ? $fields[$key] : $key;
        $body .= '<tr><td style="background:#f3f3f3;"><b>' . htmlspecialchars($displayName) . '</b></td><td>' . htmlspecialchars($value) . '</td></tr>';
      }
      $body .= '<tr><td style="background:#f3f3f3;"><b>Время</b></td><td>' . date('d.m.Y H:i:s') . '</td></tr>';
      $body .= '</table>';

      $mail->Subject = 'Заказать звонок';
      $mail->Body = $body;

      $mail->send();

      exit;
    } catch (Exception $e) {
      $mail->setLanguage('ru', 'vendor/phpmailer/phpmailer/language/');
      echo "Ошибка при отправке сообщения: " . $mail->ErrorInfo;
    }
  }

?>