$('#formSubmit').click(function () {

    const text = $('#textInput').val();
    const script = $('#script').val();

    const data = {
        "script": script,
        "text": text
    }

    const handleFormData = async () => {
       const sent = await fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        try {
            const body = await sent.json()
            console.log(body)

            let response = body.response;
            if(response) {
                const url = body.url;

                $('#audioContainer').css("display", "block");

                setTimeout(() => {

                    var audio = $('#audioPlayer').get(0);
                    audio.pause();
                        
                    $("#ttsAudio").prop('src', url);
                        
                    audio.load();
                    audio.play();
                }, 2000) 
            } else {
                $('#resultContainer').html = `
                    <div class="errorContainer">
                        <div class="alert alert-danger" role="alert">
                            Something went wrong!
                        </div>

                        <div class="errorMessage">
                            <pre>
                                ${res.body}    
                            </pre>
                        </div>
                    </div>
                `
            }       
        } catch (error) {
           console.log(error)
        }
    }

    handleFormData()

})