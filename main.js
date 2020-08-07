$(document).ready( () => {

    //Listado de alumnos
    const list = () => {
        $.ajax({
            url: 'http://localhost:8080/api/list',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                let data = '';
                res.forEach(element => {
                    data+= `
                        <tr alumnoId = ${element.id} >
                            <td>${element.id}</td>
                            <td>${element.nombre}</td>
                            <td>${element.apellidos}</td>
                            <td>${element.curso}</td>
                            <td>${element.nota}</td>

                            <td>
                                <button id="btn-details" class="btn btn-warning">Detalles</button>
                            </td>

                            <td>
                                <button id="btn-delete" class="btn btn-danger">Eliminar</button>
                            </td>

                            <td>
                                <button id="btn-edit" class="btn btn-success">Editar</button>
                            </td>


                        </tr>
                    `
                    
                });
    
                $('#tbody').html(data);
    
            }
        })

    }

    //Guardar alumno
    const save = () => {
        $('#agregar').on('click', function(){
            const datosAlumno = {
                nombre: $('#nombre').val(),
                apellidos: $('#apellidos').val(),
                curso: $('#curso').val(),
                nota: $('#nota').val()
            }

            $.ajax({
                url: 'http://localhost:8080/api/save',
                contentType: 'application/json',
                type: 'POST',
                data:JSON.stringify(datosAlumno),
                dataType: 'json',
                success: (data) => {
                    $('#messages').html('Alumno creado').css('display','block')
                    list();
                    reset();
                    console.log('Alumno registrado!');

                }

            })


        })
    }

//Detalles del alumno
const details = () => {
    $(document).on('click', '#btn-details', function(){

        let btnDetails = $(this)[0].parentElement.parentElement;
        let id = $(btnDetails).attr('alumnoId');

        $.ajax({
            url: 'http://localhost:8080/api/alumno/' + id,
            type: 'GET',
            dataType: 'json',
            success: (res) => {
                let data = `
                    <strong>Nombre</strong>  ${res.nombre} <br>
                    <strong>Apellidos</strong>  ${res.apellidos} <br>
                    <strong>Curso</strong>  ${res.curso} 
                    <strong>Nota</strong>  ${res.nota} <br>
                    <button id="btn-limpiar" class="btn btn-warning">Limpiar</button>
                `

                let alumno = $('#alumno-details').html(data);
                $('#btn-limpiar').on('click', () => {
                    alumno.html('');
                })
                

            }
        })
        

    

    
    })
}

//Eliminar alumno
const deleteAlumno = () => {
    $(document).on('click', '#btn-delete', function(){

        if(confirm('Seguro de eliminar ?')){
            let btnDelete = $(this)[0].parentElement.parentElement;
            let id = $(btnDelete).attr('alumnoId');
            
            $.ajax({
                url: 'http://localhost:8080/api/delete/' + id,
                type: 'DELETE',
                dataType: 'json',
                success: (res) => {
                    $('#messages').html('Alumno eliminado').css('display', 'block');
                    list();
    
                } 
            })

        }
    })

}

//Rellenar los datos del alumno en el formualario
const rellenarAlumno = () => {
    $(document).on('click', '#btn-edit', function(){
        let btnEdit= $(this)[0].parentElement.parentElement;
        let id = $(btnEdit).attr('alumnoId');

       $('#agregar').hide();
       $('#editar').show();

       $.ajax({
           url:'http://localhost:8080/api/alumno/' + id,
           type:  'GET',
           dataType: 'json',
           success:  (res) => {
               $('#id').val(res.id);
               $('#nombre').val(res.nombre);
               $('#apellidos').val(res.apellidos);
               $('#curso').val(res.curso);
               $('#nota').val(res.nota);

           }
       })

        
    })

}

//Método para modificar los datos de los alumnos
const editAlumno = () => {
    $('#editar').on('click', function(){
        let id = $('#id').val();
        $('#agregar').css('display', 'none');
        $('#editar').css('display', 'block');

        const datosAlumno = {
            nombre: $('#nombre').val(),
            apellidos: $('#apellidos').val(),
            curso: $('#curso').val(),
            nota: $('#nota').val()
        }

        $.ajax({
            url: 'http://localhost:8080/api/update/' + id,
            contentType: 'application/json',
            type: 'PUT',
            data:JSON.stringify(datosAlumno),
            dataType: 'json',
            success:  (res) => {
                $('#messages').html('Alumno modificado').css('display','block')
                $('#editar').css('display', 'none');
                $('#agregar').css('display','block');

                reset();
                list();
            }

        })
    })

}



//Método para limpiar el formulario
const reset = () => {
    $('#nombre').val('');
    $('#apellidos').val('');
    $('#curso').val('');
    $('#nota').val('');
}


//LLamadas a funciones
list();
save();
details();
deleteAlumno();
rellenarAlumno();
editAlumno();


    
})
