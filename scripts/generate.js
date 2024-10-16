document.getElementById('generate-pdf').addEventListener('click', function () {
    if (typeof html2canvas === 'undefined') {
        console.error('html2canvas library is not loaded!');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error loading html2canvas. Please try again.',
            confirmButtonText: 'Close'
        });
        return;
    }

    // Show confirmation modal using SweetAlert2
    Swal.fire({
        title: 'Confirm Save',
        text: 'Do you want to save this resume as a PDF?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Save PDF',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const { jsPDF } = window.jspdf; // Access jsPDF from the global scope
            const doc = new jsPDF();
            const resumeContainer = document.querySelector('.resume-container');

            doc.html(resumeContainer, {
                callback: function (pdf) {
                    try {
                        pdf.save('Generated-resume.pdf');
                        // Show success modal
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Your resume was successfully saved as a PDF.',
                            confirmButtonText: 'Close'
                        });
                    } catch (error) {
                        console.error('PDF generation error:', error);
                        // Show failure modal
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error generating your PDF. Please try again.',
                            confirmButtonText: 'Close'
                        });
                    }
                },
                margin: [10, 10, 10, 10], // Add margin if needed
                autoPaging: 'text',
                width: 190, // Adjust width for A4 sizing
                windowWidth: 650 // Set the window width for rendering
            });
        }
    });
});
