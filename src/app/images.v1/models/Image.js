export default class Image {
    constructor(props) {
        this.userId = props.userId;
        this.permission = props.isPublic ? 'public' : 'private';
        this.description = props.description;
        this.keywords = props.keywords;
        this.bytes = props.size;
        this.filename = props.filename;
    }
}