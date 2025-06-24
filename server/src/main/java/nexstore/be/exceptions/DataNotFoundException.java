package nexstore.be.exceptions;

public class DataNotFoundException extends RuntimeException {
    private final String errorCode;

    public DataNotFoundException(String message) {
        super(message);
        this.errorCode = "DATA_NOT_FOUND";
    }

    public String getErrorCode() {
        return errorCode;
    }
}
