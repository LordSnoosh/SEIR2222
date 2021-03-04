
$('.add-skill').on('click', function(evt) {
    let template = `
    <tr>
    <td><button class="btn btn-xs btn-danger">X</button>${$('.new-skill').val()}</td>
    </tr>
    `
    $('#skills tbody').append(template);
});

$('#skills tbody').on('click', 'button', function() {
    $(this).closest('tr').fadeOut(1000), function() {
        $(this).remove();
    };
})
