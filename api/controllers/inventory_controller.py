from flask import Blueprint, jsonify, request, flash

from api.managers.db_manager import session
from api.models import Inventory

inventory_blueprint = Blueprint('inventory_blueprint', __name__,
                                url_prefix='/inventory',
                                template_folder='templates')


@inventory_blueprint.route('/<inv_id>', methods=['GET'])
def get_inv_by_id(inv_id):
    """
    get inventory from db by ID
    :param inv_id:
    :return:
    """
    # look up ID, if non-exist return error message
    inv = session.query(Inventory).filter_by(id=inv_id).first()
    if not inv:
        return jsonify({'error': 'no inventory with id {} found'.format(inv_id)}), 400
    return jsonify({'inventory': inv.serialize()})


@inventory_blueprint.route('/all', methods=['GET'])
def get_all_invs():
    """
    get all inventory
    :return:
    """
    inv = session.query(Inventory).all()
    if not inv:
        flash('no inventory found')
        return jsonify({'error': 'no inventory found'})
    return jsonify({'inventory': [i.serialize() for i in inv]})


@inventory_blueprint.route('/create', methods=['POST'])
def create_new_inventory():
    """
    create new inventory item
    :return:
    """
    if not request.json:
        return jsonify({'error': 'no body supplied'}), 400

    inv = Inventory(**request.json)
    session.add(inv)
    resp = session.commit()
    if not resp:
        return jsonify({'message': 'inventory created'})
