declare const AWS: any;

export async function updateAWS(aki: string, sak: string, filename: string, data: any, type: string) {
  const s3 = new AWS.S3({
    accessKeyId: aki,
    secretAccessKey: sak,
    region: "eu-central-1"
  });
  const request = {
    Bucket:
      `wip-cdn.ae-mfm-general.dev.cloudhh.de/wip-notification-assets`,
    Key: filename,
    Body: data,
    ContentType: type,
    ACL: "public-read",
    CacheControl: "max-age=60"
  };
  await s3.putObject(request, (err: any, data: any) => {
      if(err) {
        alert(err)
      }else{
        alert("Speichern erfolgreich!");
      }
    }
  );
}