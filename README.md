#  Compression Store

Compression Store allows the storing and delivery of compressed files with no extra compression overhead during delivery. It can dynamically create zip archives from different files on the fly.and supports resumable downloading (byte ranges).

It is currently a technical demo and should not be used in production.

## Prerequisites

If using docker, make sure you have docker 1.10 and docker-compose 1.6

## Quick start

Clone the repository
```bash
git clone https://github.com/davidkempers/compression-store.git
```

Run docker-compose with default local filesystem and 'uploads' to save files  
Note: npm will install packages so be patient

```bash
docker-compose up -d
```
Using Amazon S3

```bash
export STORAGEPROVIDER=amazon
export AWSREGION=eu-west-1
export AWSCONTAINER=my-test
export AWSACCESSKEY=XXXXXXXXXX
export AWSSECRETKEY=XXXXXXXXXX
docker-compose up -d
```

To follow the install and logs run

```bash
docker-compose logs
```
Then open your browser at http://localhost:3000

## Environment variables

DATABASEHOST - Mongodb database host  
DATABASEPORT - Mongodb port  
DATABASENAME - Mongodb database name  
STORAGEPROVIDER - Currently only two options. Will support other pkgcloud providers
* amazon
  * AWSREGION - AWS region to save to
  * AWSCONTAINER - AWS container - this has to already be created
  * AWSACCESSKEY - AWS Access Key
  * AWSSECRETKEY - AWS Secret Key
* disk
  * STORAGEPATH - The path to save files  


## TODO

* Better uploading capability. eg tar, tar.gz and zip extraction support
* Directory structure support
* LZMA compression (maybe bzip2)
* Separate frontend GUI for building archives (compression-store-manager)
* S3 api compatiblity
* Tests

## Credits

Chris Talkington for [Archivejs](https://github.com/archiverjs)  
People at [PkgCloud](https://github.com/pkgcloud)  
Express [Multer](https://github.com/expressjs/multer)

## Licence

The MIT License (MIT)
Copyright (c) 2016 David Kempers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
