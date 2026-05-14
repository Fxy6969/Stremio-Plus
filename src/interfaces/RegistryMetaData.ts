interface RegistryMetaData {
    name: string;
    author: string;
    description: string;
    version: string;
    repo: string;
    download: string;
    preview?: string;
    tags?: string[];
    requires?: string[];
}

export default RegistryMetaData;
