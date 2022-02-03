from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler

from onnx_model import ConfigInspector, ModelInteractor

MODEL = ModelInteractor()


# Restrict to a particular path.
class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)


# Create server
with SimpleXMLRPCServer(
        ('0.0.0.0', 2117),
        requestHandler=RequestHandler, allow_none=True) as server:
    server.register_introspection_functions()

    # Register pow() function; this will use the value of
    # pow.__name__ as the name, which is just 'pow'.
    server.register_function(MODEL.predict, 'get_prediction')
    server.register_function(ConfigInspector.get_all_model_names)
    server.register_function(ConfigInspector.get_label_array)

    # Register a function under a different name
    # server.register_function(adder_function, 'add')

    # Run the server's main loop
    server.serve_forever()

