 module .exports = function replacehtml(template, product){
    let output = template.replace('{{%ID%}}', product.id);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%IMAGE%}}', product.img);
  output = output.replace('{{%AGE%}}', product.age);
  output = output.replace('{{%SECRET%}}', product.secretIdentity);
  output = output.replace('{{%POWERS%}}', product.powers);

  return output;
}