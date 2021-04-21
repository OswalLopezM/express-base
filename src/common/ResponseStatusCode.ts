export enum ResponseStatusCode {
    success=200,
    bad_request=400,
    internal_server_error=500,
    creation_success = 201,
    modification_success = 202,
    delete_success = 203,
    creation_error = 401,
    modification_error = 402,
    delete_error = 403,
}