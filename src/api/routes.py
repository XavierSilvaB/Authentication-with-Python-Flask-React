"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).one_or_none()

    if user != None and user.password==password:
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token":access_token, "user":user.serialize()}), 200
    else:
        return jsonify({'message': 'Contraseña o Email incorrecto'}), 401 


@api.route("/user-data", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    user = User.query.filter_by(id=current_user_id).one_or_none()
    
    return jsonify({"id": user.id, "user": user.serialize() }), 200

@api.route("/registro", methods=["POST"])
def registro_users():
    body = request.json
    if "email" not in body:
        return jsonify({'message': 'Ingresa el Correo'}) , 400
    if "password" not in body:
        return jsonify({'message': 'Ingresar una contraseña'}), 400
    if "is_active" not in body:
        return jsonify({'message': 'Indicar si está ACTIVO'}), 400
    else:
       
        new_user = User.create(body)

        if new_user != None:
            return jsonify(new_user.serialize()), 200
        else:
            return jsonify({'message': 'Ocurrio un Error, Intente de nuevo'}), 500
            

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200