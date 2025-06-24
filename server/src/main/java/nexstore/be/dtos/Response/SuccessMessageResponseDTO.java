package nexstore.be.dtos.Response;


import lombok.Getter;
import lombok.Setter;
import nexstore.be.constants.TextConstants;

@Setter
@Getter
public class SuccessMessageResponseDTO{
    private String message;
    private String status;

    public SuccessMessageResponseDTO(String message) {
        this.status = TextConstants.SUCCESS;
        this.message = message;
    }

}
