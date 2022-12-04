const gulp  = require('gulp');
// npm install gulp-sass  (it converts sass to css)
// npm install cssnano (compress the css file)
const sass = require('gulp-sass')(require('sass'));

const cssnano = require('gulp-cssnano');

const rev = require('gulp-rev'); // to add hash to the file when it send to browser


gulp.task('css', function(){

console.log("Minifying css");
//********TAKING SCSS FILES FROM ASSETS */
 gulp.src('./assets/sass/**/*.scss')// ** means any folder or subfolder inside it 
 //pipe is a function which are calling this submodule
 .pipe(sass()) //converting sass to css
 .pipe(cssnano()) // compressing the css files
 .pipe(gulp.dest('./assets.css')) // Storing the css files into css folder
   
 // Changing the naming and storing in public folder
 return gulp.src('./assets/**/*.css') // Selecting the path

 // renaming the files
 .pipe(rev())
 // Storing the files

 .pipe(gulp.dest('./public/assets'))
 // Storing the manifest :=  it store a hashmap of a file and coressponding renamed file
 // e.g   home.css : home-dkenficsamci . css

 .pipe(rev.manifest({
    cwd : 'public', // current working directory
    merge : true // if file already exist the merge 
     
 }))

 .pipe(gulp.dest('./public/assets'));

})