import '../assets/organization.scss';
import { useUserContext } from '../App';
import { useOrgDesc } from '../hooks/useUser';
import { useEffect, useState } from 'react';
import { usePatchOrg } from '../hooks/useUser';
function Organization() {
  const context = useUserContext();
  const patchOrgMutation = usePatchOrg(context?.user);
  const { data: orgData, isLoading: orgLoading } = useOrgDesc(context?.user);
  const [orgName, setOrgName] = useState(orgData?.organization_name);
  const [orgDesc, setOrgDesc] = useState(orgData?.organization_description);
  useEffect(() => {
    if (orgData) {
      setOrgName(orgData.organization_name ?? '');
      setOrgDesc(orgData.organization_description ?? '');
    }
  }, [orgData]);
  if (orgLoading) return;

  const handleSave = () => {
    if (!context?.user) return;
    if (!orgName || orgName.length < 3) {
      window?.Telegram?.WebApp?.showAlert('Ваше имя должно быть длинее 2 символов');
      return;
    }
    patchOrgMutation.mutate({
      user: context.user,
      organization_name: orgName,
      organization_description: orgDesc,
    });
  };
  return (
    <>
      <div className="organization">
        <form className="org_form">
          <div className="org_form_input">
            <div className="org_form_input_title">Название организации:</div>
            <textarea
              className="org_form_input_input"
              placeholder="Название"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              maxLength={32}
              minLength={3}
            ></textarea>
          </div>
          <div className="org_form_input">
            <div className="org_form_input_title">Описание организации:</div>
            <textarea
              className="org_form_input_input"
              placeholder="Описание"
              value={orgDesc}
              onChange={(e) => setOrgDesc(e.target.value)}
              maxLength={200}
              minLength={0}
            ></textarea>
          </div>
          <div className="org_form_input_button" onClick={handleSave}>
            Сохранить изменения
          </div>
        </form>
      </div>
    </>
  );
}
export default Organization;
