export default class Image {
    constructor(props) {
        this.userId = props.userId;
        this.permission = props.isPublic ? 'public' : 'private';
        this.description = description;
        this.keywords = Array.isArray(props.keywords) &&
            props.keywords.length === 0 ? null : props.keywords;
        this.bytes = props.size;
        this.filename = props.filename;
    }
}