<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    protected $table = "enderecos";
    protected $filleble = ['user_id','cep','cidade','logradoura','estado','numero','bairro','complement'];
}
