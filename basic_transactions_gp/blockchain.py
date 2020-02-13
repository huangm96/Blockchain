# Paste your version of blockchain.py from the basic_block_gp
# folder here

import hashlib
import json
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request


class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # Create the genesis block
        self.new_block(previous_hash="Hello World", proof=100)

    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain

        A block should have:
        * Index
        * Timestamp
        * List of current transactions
        * The proof used to mine this block
        * The hash of the previous block

        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
            "index": len(self.chain) + 1,
            "timestamp": time(),
            "transactions": self.current_transactions,
            "proof": proof,
            "previous_hash": previous_hash or self.hash(self.chain[-1]),
        }

        # Reset the current list of transactions
        self.current_transactions = []

        # Append the block to the chain
        self.chain.append(block)

        # Return the new block
        return block
    """
    Create a method in the `Blockchain` class called `new_transaction` 
    that adds a new transaction to the list of transactions:

    :param sender: <str> Address of the Recipient
    :param recipient: <str> Address of the Recipient
    :param amount: <int> Amount
    :return: <int> The index of the `block` that will hold this transaction
    """

    def new_transaction(self, sender, recipient, amount):

        transaction = {
            "sender": sender,
            "recipient": recipient,
            "amount": amount
        }
        self.current_transactions.append(transaction)
        return self.last_block['index']+1

    def hash(self, block):
        """
        Creates a SHA-256 hash of a Block

        :param block": <dict> Block
        "return": <str>
        """

        # Use json.dumps to convert json into a string
        # Use hashlib.sha256 to create a hash
        # It requires a `bytes-like` object, which is what
        # .encode() does.
        # It converts the Python string into a byte string.
        # We must make sure that the Dictionary is Ordered,
        # or we'll have inconsistent hashes

        # TODO: Create the block_string
        string_object = json.dumps(block, sort_keys=True)
        block_string = string_object.encode()

        # TODO: Hash this string using sha256
        raw_hash = hashlib.sha256(block_string)
        hex_hash = raw_hash.hexdigest()

        # By itself, the sha256 function returns the hash in a raw string
        # that will likely include escaped characters.
        # This can be hard to read, but .hexdigest() converts the
        # hash to a string of hexadecimal characters, which is
        # easier to work with and understand

        # TODO: Return the hashed block string in hexadecimal format
        return hex_hash

    @property
    def last_block(self):
        return self.chain[-1]

    # def proof_of_work(self, block):
    #     """
    #     Simple Proof of Work Algorithm
    #     Stringify the block and look for a proof.
    #     Loop through possibilities, checking each one against `valid_proof`
    #     in an effort to find a number that is a valid proof
    #     :return: A valid proof for the provided block
    #     """
    #     # TODO
    #     block_string = json.dumps(block, sort_keys=True)
    #     proof = 0
    #     while self.valid_proof(block_string, proof) is False:
    #         proof += 1

    #     return proof

    @staticmethod
    def valid_proof(block_string, proof):
        """
        Validates the Proof:  Does hash(block_string, proof) contain 3
        leading zeroes?  Return true if the proof is valid
        :param block_string: <string> The stringified block to use to
        check in combination with `proof`
        :param proof: <int?> The value that when combined with the
        stringified previous block results in a hash that has the
        correct number of leading zeroes.
        :return: True if the resulting hash is a valid proof, False otherwise
        """
        # TODO
        guess = f'{block_string}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        # return True or False
        return guess_hash[:3] == "000"


# Instantiate our Node
app = Flask(__name__)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()
print(blockchain.chain)
print(blockchain.hash(blockchain.last_block))

@app.route('/transactions/new', methods=['POST'])
def receive_new_transaction():
    data = request.get_json()

    required_data = ['sender', 'recipient', 'amount']
    if not all(k in data for k in required_data):
        response = {
            "message": "missing sender, recipient or amount"
        }
        return jsonify(response), 400
    
    index = blockchain.new_transaction(data["sender"], data["recipient"], data["amount"])
    
    response = {"message": f"Transactions will be included in block {index}"}
    
    return jsonify(response), 200

@app.route('/mine', methods=['POST'])
def mine():
    data = request.get_json()
    print(data)

    required_data=["proof","id"]
    if not all (k in data for k in required_data):
        response = {
            "message": "missing proof or id"
        }
        return jsonify(response), 400

    block_string = json.dumps(blockchain.last_block, sort_keys=True)

    if Blockchain.valid_proof(block_string, data["proof"]) is False:
        response = {
            "message": "valid_proof fail"
        }
        return jsonify(response), 200
    else:
        previous_hash = blockchain.hash(blockchain.last_block)

        block_index = blockchain.new_transaction(0,data["id"],1)

        new_block = blockchain.new_block(data["proof"], previous_hash)
    
        response = {
            "message": "New Block Forged",
            "block": new_block,
            "reward": f"Reward paid in block{block_index}"
        }
        return jsonify(response), 200


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        "chain": blockchain.chain,
        "length": len(blockchain.chain)
    }
    return jsonify(response), 200


@app.route('/last_block', methods=['GET'])
def get_last_block():

    response = {
        # TODO: Send a JSON response with the new block
        "last_block": blockchain.last_block
    }

    return jsonify(response), 200


# Run the program on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
