interface CallApiProps<RequestType, ResponseType> {
    onSuccess?: (data: ResponseType) => void;
    onFail?: (error: any) => void;
    url: string;
    requestPayload?: RequestType;
    method?:'get'|'post';
}

export function callApi<RequestType, ResponseType>({
    onSuccess,
    onFail,
    url,
    requestPayload,
    method
}: CallApiProps<RequestType, ResponseType>) {
    if(method==='post'){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
        })
            .then((res) => res.json())
            .then((data: ResponseType) => {
                if (onSuccess) {
                    onSuccess(data);
                }
            })
            .catch((error) => {
                if (onFail) {
                    onFail(error);
                }
            });
    }else{
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
        })
            .then((res) => res.json())
            .then((data: ResponseType) => {
                if (onSuccess) {
                    onSuccess(data);
                }
            })
            .catch((error) => {
                if (onFail) {
                    onFail(error);
                }
            });
    }
    
}
