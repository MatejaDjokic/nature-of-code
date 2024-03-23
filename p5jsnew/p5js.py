import shutil
import os
import sys


def copy_templates_directory():
    raw_name: str = sys.argv[1].replace(" ", "_").lower()
    name: str = raw_name.replace("_", " ").upper()
    # Get the path to the script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct the path to the p5js folder
    p5js_dir = os.path.join(script_dir, "p5js")

    # Check if the p5js folder exists
    if os.path.exists(p5js_dir):
        # Copy the entire directory to the current working directory
        shutil.copytree(p5js_dir, os.path.join(
            os.getcwd(), raw_name), dirs_exist_ok=True)

        sketch_js: str = f'{raw_name}/sketch.js'
        with open(sketch_js, 'r') as read_sketch_js:
            text: str = read_sketch_js.read()
            text = text.replace('const txt = "Hello World";',
                                f'const txt = "{name}";')
        with open(sketch_js, 'w') as write_sketch_js:
            write_sketch_js.write(text)

        index_html: str = f'{raw_name}/index.html'
        with open(index_html, 'r') as read_index_html:
            text: str = read_index_html.read()
            text = text.replace('<title>Hello World</title>',
                                f'<title>{name}</title>')
        with open(index_html, 'w') as write_index_html:
            write_index_html.write(text)

        print("p5js directory copied successfully to current directory.")
    else:
        print("p5js folder not found.")


# Example usage:
if __name__ == "__main__":
    copy_templates_directory()
