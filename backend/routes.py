from flask import Blueprint, request, jsonify
from extensions import db
from models import User, Transaction
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_user = User(username=username, password_hash=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@api.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

@api.route('/transactions', methods=['GET'])
def get_transactions():
    user_id = request.args.get('user_id') # In a real app, use JWT
    if not user_id:
        return jsonify({'message': 'User ID required'}), 400
        
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    return jsonify([t.to_dict() for t in transactions]), 200

@api.route('/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    try:
        new_transaction = Transaction(
            user_id=data['user_id'],
            type=data['type'],
            amount=data['amount'],
            category=data['category'],
            date=datetime.fromisoformat(data['date']).date(),
            description=data.get('description', '')
        )
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify(new_transaction.to_dict()), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@api.route('/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    transaction = Transaction.query.get_or_404(id)
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction deleted'}), 200
