<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
   integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <title>Document</title>
  <style>
  body {
  margin: 0;
  padding: 0;
  background-color: #17a2b8;
  height: 100vh;
}
#login .container{
  margin-top: 120px;
  max-width: 600px;
  height: 320px;
  border: 1px solid #9C9C9C;
  background-color: #EAEAEA;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -85px;
}
</style>
<body>
</head>



<body class="bg-dark mt-4">
  <br><br><br>
  <div class="container mt-4">
    <div class="row">
    <div class="col-md-6 offset-md-3 shadow-sm p-3 mb-5 bg-white rounded">
        <form action="{{route('user.register')}}" method="post" id="login">
        @csrf
        <div class="form-group col-12">
            <label for="Login">Nome Completo:</label>
            <input type="text" class="form-control" placeholder="Digite seu nome" name="nome">
            @error('nome')
            <span class="text-danger">{{$message}}</span>
            @enderror
          </div>

          <div class="form-group col-12">
            <label for="Login">Login:</label>
            <input type="text" class="form-control" placeholder="Digite seu login" name="login">
            @error('login')
            <span class="text-danger">{{$message}}</span>
            @enderror
          </div>
          <div class="form-group col-12">
            <label for="Login">CPF:</label>
            <input type="text" class="form-control" placeholder="Digite seu cpf" name="password">
            @error('password')
            <span class="text-danger">{{$message}}</span>
            @enderror
            <button class="btn btn-primary float-right mt-4">Logar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>
</html>



<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!------ Include the above in your HEAD tag ---------->
